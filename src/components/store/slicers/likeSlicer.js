import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../../../services/blogService';

const { likeArticle, unLikeArticle } = blogService();

// Получаем лайки из localStorage
const getInitialLikes = () => {
  const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
  return new Set(storedLikes);
};

// Async actions
export const likeUserArticle = createAsyncThunk(
  'likes/likeArticle',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await likeArticle(credentials);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const unLikeUserArticle = createAsyncThunk(
  'likes/unLikeArticle',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await unLikeArticle(credentials);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Slice
const likesSlice = createSlice({
  name: 'likes',
  initialState: {
    likedSlugs: Array.from(getInitialLikes()),
    loading: false,
    error: null,
    favorited: false,
    favoritesCount: 0,
  },
  reducers: {
    setFavoritesCount(state, action) {
        state.favoritesCount = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(likeUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeUserArticle.fulfilled, (state, action) => {
        const slug = action.payload.slug;
        const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
        const likesSet = new Set(storedLikes);

        likesSet.add(slug);
        localStorage.setItem('likesCollection', JSON.stringify([...likesSet]));

        state.likedSlugs = [...likesSet];
        state.favorited = true;
        state.favoritesCount = action.payload.favoritesCount;
        state.loading = false;
      })
      .addCase(likeUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(unLikeUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unLikeUserArticle.fulfilled, (state, action) => {
        const slug = action.payload.slug;
        const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
        const likesSet = new Set(storedLikes);

        likesSet.delete(slug);
        localStorage.setItem('likesCollection', JSON.stringify([...likesSet]));

        state.likedSlugs = [...likesSet];
        state.favorited = false;
        state.favoritesCount = action.payload.favoritesCount;
        state.loading = false;
      })
      .addCase(unLikeUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {setFavoritesCount} = likesSlice.actions;

export default likesSlice.reducer;
