import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogService from "../../../services/blogService";
import defaultAvatar from "../../../resources/smiley-cyrus.jpg";

const { login, registeration, getProfile, getUserInfo, updateUser } =
  blogService();
export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);

      localStorage.setItem("jwtToken", response.token);
      if (response.errors) {
      }
      return response; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
export const getUser = createAsyncThunk(
  "user/profile",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getProfile(credentials);
      return response.profile; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const registerUser = createAsyncThunk(
  "user/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await registeration(credentials);
      localStorage.setItem("jwtToken", response.token);
      return response; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateCurrentUser = createAsyncThunk(
  "user/update",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await updateUser(credentials);
      localStorage.setItem("jwtToken", response.token);
      if (response.errors) {
      }
      return response; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const getCurrentUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await getUserInfo(credentials);
      return response; // { email, token }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: "",
    username: "",
    token: "",
    img: "",
    loading: false,
    isLogined: false,
    validationError: null,
  },
  reducers: {
    logout(state) {
      state.email = "";
      state.token = "";
      state.username = "";
      state.img = "";
      state.isLogined = false;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setLogin(state) {
      state.isLogined = true;
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
        state.username = action.payload.username;
        state.isLogined = true;
        state.img = action.payload.image;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.img = defaultAvatar;
        state.token = action.payload.token;
        state.isLogined = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.img = action.payload.image;
        if (!action.payload.image) state.img = defaultAvatar;
        state.isLogined = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getCurrentUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCurrentUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.img = action.payload.image;
        if (!action.payload.image) state.img = defaultAvatar;
        state.isLogined = true;
      })
      .addCase(getCurrentUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.username = action.payload.username;
        state.email = action.payload.email;
        state.img = action.payload.image;
        if (!action.payload.image) state.img = defaultAvatar;
        state.isLogined = true;
      })
      .addCase(updateCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setLogin } = userSlice.actions;
export default userSlice.reducer;
