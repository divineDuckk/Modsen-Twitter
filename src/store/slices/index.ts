import { combineReducers } from '@reduxjs/toolkit';

import tweetPageSlice from './tweetPageSlice';
import userSlice from './userSlice';

export const rootReducer = combineReducers({
  user: userSlice,
  page: tweetPageSlice,
});
