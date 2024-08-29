import { createSlice } from '@reduxjs/toolkit';
import { BIG_PAGE_SIZE, PAGE_SIZE } from '@/constants';
import { TweetPageSizeState } from '@/interfaces/tweet';

const initialState: TweetPageSizeState = {
  page: PAGE_SIZE,
  pageForAllTweets: BIG_PAGE_SIZE,
};
const tweetPageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    nextTweets(state) {
      state.page += PAGE_SIZE;
    },
    nextTweetsInHome(state) {
      state.pageForAllTweets += BIG_PAGE_SIZE;
    },
  },
});

export default tweetPageSlice.reducer;
export const { nextTweets, nextTweetsInHome } = tweetPageSlice.actions;
