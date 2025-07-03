import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import blogService from '../../../services/blogService';

const {getArticles} = blogService();

export const getArticlesList = createAsyncThunk(
  'articles/all',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getArticles(credentials);
      console.log(response);
      
      return response;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    data: []
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticlesList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticlesList.fulfilled, (state, action) => {
        state.data = action.payload;
      })
      .addCase(getArticlesList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articleSlice.reducer;   