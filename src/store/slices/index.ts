import { combineReducers } from '@reduxjs/toolkit';

import themeSlice from './themeSlice';
import tweetPageSlice from './tweetPageSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  page: tweetPageSlice,
  theme: themeSlice,
});
