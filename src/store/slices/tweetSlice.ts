import { TweetState } from '@/interfaces/tweet';
import { createSlice } from '@reduxjs/toolkit';

const initialState: TweetState = {
  tweets: [],
};
const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    setTweets(state, { payload }) {
      state.tweets = payload;
    },
    addTweet(state, { payload }) {
      state.tweets = [payload, ...state.tweets];
    },
    updateTweet(state, { payload }) {
      state.tweets = state.tweets.map((tweet) => {
        if (tweet.id === payload.id) return payload;
        return tweet;
      });
    },
    deleteTweet(state, { payload }) {
      state.tweets = state.tweets.filter(({ id }) => id !== payload);
    },
    resetTweets(state) {
      state.tweets = [];
    },
  },
});

export default tweetSlice.reducer;
export const { setTweets, deleteTweet, addTweet, updateTweet, resetTweets } =
  tweetSlice.actions;
