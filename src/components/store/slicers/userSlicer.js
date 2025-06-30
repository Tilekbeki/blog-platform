import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import blogService from '../../../services/blogService';

const {login, registeration} = blogService()
export const loginUser = createAsyncThunk(
  'user/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);
      console.log(response.user)
      return response.user; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await registeration(credentials);
      console.log(response);
      return response.user; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    email: '',
    token: '',
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.email = '';
      state.token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;   