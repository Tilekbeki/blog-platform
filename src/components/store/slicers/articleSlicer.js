import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from '../../../services/blogService';

const {getArticle, createArticle,updateArticle, deleteArticle} = blogService();

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

export const DeleteCurrentUserArticle = createAsyncThunk(
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
      .addCase(DeleteCurrentUserArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(DeleteCurrentUserArticle.fulfilled, (state) => {
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
      .addCase(DeleteCurrentUserArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;   