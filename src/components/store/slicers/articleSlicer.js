import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from '../../../services/blogService';

const {getArticle, createArticle,updateArticle, deleteArticle, likeArticle, unLikeArticle} = blogService();

export const getCurrentArticle = createAsyncThunk(
  'articles/current',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getArticle(credentials);
      
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createUserArticle = createAsyncThunk(
  'articles/create',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await createArticle(credentials);
      
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const deleteCurrentUserArticle = createAsyncThunk(
  'articles/delete',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await deleteArticle(credentials);
      
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const updateUserArticle = createAsyncThunk(
  'articles/update',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await updateArticle(credentials);
      
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const likeUserArticle = createAsyncThunk(
  'articles/like',
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
  'articles/unLike',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await unLikeArticle(credentials);
      
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    slug: '',
    title: '',
    description: '',
    body: '',
    image:'',
    tags: [],
    loading: false,
    error: false,
    author: '',
    createdAt:'',
    favorited: false

  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentArticle.fulfilled, (state, action) => {
          const {
            slug,
            title,
            description,
            body,
            tagList,
            image,
            favoritesCount,
            author,
            createdAt,
          } = action.payload;

          const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
          const likesSet = new Set(storedLikes);

          state.slug = slug;
          state.title = title;
          state.description = description;
          state.body = body;
          state.tags = tagList;
          state.image = image;
          console.log(likesSet.has(slug), 'likeee')
          state.favorited = likesSet.has(slug);
          state.favoritesCount = favoritesCount;
          state.author = author;
          state.createdAt = createdAt;
          state.loading = false;
          state.error = null;
        })

      .addCase(getCurrentArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createUserArticle.fulfilled, (state, action) => {
        state.slug = action.payload.slug;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.body = action.payload.body;
        state.tags = action.payload.tagList;
        state.image = action.payload.image;
        state.favoritesCount = action.payload.favoritesCount;
        state.author = action.payload.author;
        state.createdAt = action.payload.createdAt;
        
      })
      .addCase(createUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserArticle.fulfilled, (state, action) => {
        state.slug = action.payload.slug;
        state.title = action.payload.title;
        state.description = action.payload.description;
        state.body = action.payload.body;
        state.tags = action.payload.tagList;
        state.image = action.payload.image;
        state.favoritesCount = action.payload.favoritesCount;
        state.author = action.payload.author;
        state.createdAt = action.payload.createdAt;
        
      })
      .addCase(updateUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteCurrentUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCurrentUserArticle.fulfilled, (state) => {
        state.slug = '';
        state.title = '';
        state.description = '';
        state.body = '';
        state.tags = '';
        state.image = '';
        state.favoritesCount = '';
        state.author = '';
        state.createdAt = '';
        
      })
      .addCase(deleteCurrentUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likeUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(likeUserArticle.fulfilled, (state, action) => {
        const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
        const likesSet = new Set(storedLikes);

        likesSet.add(action.payload.slug); // добавить slug
        localStorage.setItem('likesCollection', JSON.stringify([...likesSet]));

        state.favorited = true;
        state.favoritesCount = action.payload.favoritesCount;
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
        const storedLikes = JSON.parse(localStorage.getItem('likesCollection') || '[]');
        const likesSet = new Set(storedLikes);

        likesSet.delete(action.payload.slug); // удаляем slug из Set
        localStorage.setItem('likesCollection', JSON.stringify([...likesSet])); // сохраняем обратно

        state.favorited = likesSet.has(action.payload.slug); // будет false
        state.favoritesCount = action.payload.favoritesCount;
      })
      .addCase(unLikeUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;   