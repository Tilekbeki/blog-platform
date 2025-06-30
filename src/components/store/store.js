
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/slicers/userSlicer'

const store = configureStore({
    reducer: {
    user: userSlice
  },
  devTools: true,
})

export default store;