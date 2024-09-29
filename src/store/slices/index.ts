import { combineReducers } from '@reduxjs/toolkit';

import themeSlice from './themeSlice';
import tweetSlice from './tweetSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  tweets: tweetSlice,
});
