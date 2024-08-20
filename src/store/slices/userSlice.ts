import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';
import defaultAvatar from '@/assets/avatar.png';
import defaultBg from '@/assets/defaultBg.png';

const initialState: User = {
  displayName: '',
  email: '',
  uid: '',
  followers: 0,
  followings: 0,
  photoURL: defaultAvatar,
  backgroundUrl: defaultBg,
  description: '',
  tweets: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.email = payload.email;
      state.photoURL = payload.photoURL;
      state.phone = payload.phone;
      state.birthDate = payload.birthDate;
      state.tweetsNumber = payload.tweetsNumber;
      state.followers = payload.followers;
      state.followings = payload.followings;
      state.backgroundUrl = payload.backgroundUrl;
      state.description = payload.description;
    },
    removeUser(state) {
      state.displayName = '';
      state.email = '';
      state.photoURL = defaultAvatar;
      state.phone = '';
      state.uid = '';
      state.birthDate = '';
      state.tweetsNumber = 0;
      state.followers = 0;
      state.followings = 0;
      state.backgroundUrl = defaultBg;
      state.description = '';
    },

    setTweets(state, { payload }) {
      state.tweets = payload.reverse();
    },
    addTweet(state, { payload }) {
      state.tweets = [...state.tweets, payload];
    },
    updateTweet(state, { payload }) {
      state.tweets = state.tweets.map(tweet => {
        if (tweet.id === payload.id) return payload;
        return tweet;
      });
    },
    deleteTweet(state, { payload }) {
      state.tweets = state.tweets.filter(({ id }) => id !== payload);
    },
  },
});

export default userSlice.reducer;
export const {
  removeUser,
  setUser,
  addTweet,
  deleteTweet,
  setTweets,
  updateTweet,
} = userSlice.actions;
