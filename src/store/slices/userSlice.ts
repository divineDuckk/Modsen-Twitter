import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';
import defaultAvatar from '@/assets/avatar.png';
import defaultBg from '@/assets/defaultBg.png';

const initialState: User = {
  displayName: '',
  birthDate: '',
  email: '',
  uid: '',
  followers: 0,
  followings: 0,
  photoURL: defaultAvatar,
  backgroundUrl: defaultBg,
  description: '',
  tweets: [],
  phone: '',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      Object.assign(state, payload);
    },
    deleteUser(state) {
      state.displayName = '';
      state.email = '';
      state.photoURL = defaultAvatar;
      state.phone = '';
      state.uid = '';
      state.birthDate = '';
      state.followers = 0;
      state.followings = 0;
      state.backgroundUrl = defaultBg;
      state.description = '';
      state.birthDate = '';
      state.tweets = [];
    },

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
  },
});

export default userSlice.reducer;
export const {
  deleteUser,
  setUser,
  addTweet,
  deleteTweet,
  setTweets,
  updateTweet,
} = userSlice.actions;
