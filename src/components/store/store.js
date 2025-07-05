
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/slicers/userSlicer'
import articlesSlice from '../store/slicers/articlesSlicer';
import articleSlicer from '../store/slicers/articleSlicer';

const store = configureStore({
    reducer: {
      user: userSlice,
      articles: articlesSlice,
      article: articleSlicer
  },
  devTools: true,
})

export default store;