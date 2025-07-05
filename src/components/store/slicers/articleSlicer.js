import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from '../../../services/blogService';

const {getArticle} = blogService();

export const getCurrentArticle = createAsyncThunk(
  'articles/current',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getArticle(credentials);
      console.log(response);
      
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
      .addCase(getCurrentArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;   