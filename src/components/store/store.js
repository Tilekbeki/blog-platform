
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/slicers/userSlicer'
import articleSlice from '../store/slicers/articleSlicer';

const store = configureStore({
    reducer: {
    user: userSlice,
    articles: articleSlice
  },
  devTools: true,
})

export default store;