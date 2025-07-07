import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from '../../../services/blogService';

const {
  getArticles,
  likeArticle: likeArticleAPI,
  unLikeArticle: unlikeArticleAPI,
} = blogService();

// Получение списка статей
export const getArticlesList = createAsyncThunk(
  'articles/all',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getArticles(credentials);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Лайк статьи
export const likeArticle = createAsyncThunk(
  'articles/like',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await likeArticleAPI(slug);
      return response; // предполагается, что API возвращает { article: {...} }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

// Дизлайк статьи
export const unlikeArticle = createAsyncThunk(
  'articles/unlike',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await unlikeArticleAPI(slug);
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    data: [],
    loading: false,
    error: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticlesList.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getArticlesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Лайк
      .addCase(likeArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.data.findIndex(item => item.slug === updatedArticle.slug);
        if (index !== -1) {
          state.data[index] = updatedArticle;
          console.log('нашел')
        }
        console.log(updatedArticle)
      })

      // Дизлайк
      .addCase(unlikeArticle.fulfilled, (state, action) => {
        const updatedArticle = action.payload;
        const index = state.data.findIndex(item => item.slug === updatedArticle.slug);
        if (index !== -1) {
          state.data[index] = updatedArticle;
          console.log('нашел')
        }
        console.log(state.data)
      });
  },
});

export default articlesSlice.reducer;
