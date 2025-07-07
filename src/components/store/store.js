
import { configureStore } from '@reduxjs/toolkit';
import userSlice from '../store/slicers/userSlicer'
import articlesSlice from '../store/slicers/articlesSlicer';
import articleSlicer from '../store/slicers/articleSlicer';
import likeSlicer from '../store/slicers/likeSlicer';

const store = configureStore({
    reducer: {
      user: userSlice,
      articles: articlesSlice,
      article: articleSlicer,
      likes: likeSlicer,
  },
  devTools: true,
})

export default store;