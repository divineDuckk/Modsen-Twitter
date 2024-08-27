import { createSlice } from '@reduxjs/toolkit';
import { PAGE_SIZE } from '@/constants';
import { TweetPageSizeState } from '@/interfaces/tweet';

const initialState: TweetPageSizeState = {
  page: PAGE_SIZE,
};
const tweetPageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    nextTweets(state) {
      state.page += PAGE_SIZE;
    },
  },
});

export default tweetPageSlice.reducer;
export const { nextTweets } = tweetPageSlice.actions;
