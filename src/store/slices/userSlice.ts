import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';
import defaultAvatar from '@/assets/avatar.png';
import defaultBg from '@/assets/defaultBg.png';

const initialState: User = {
  displayName: '',
  birthDate: '',
  email: '',
  uid: '',
  followers: [],
  followings: [],
  photoURL: defaultAvatar,
  backgroundUrl: defaultBg,
  description: '',
  tweets: [],
  phone: '',
  password: '',
  numberOfTweets: 0,
  numberOfFollowers: 0,
  numberOfFollowings: 0,
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
      state.followers = [];
      state.followings = [];
      state.backgroundUrl = defaultBg;
      state.description = '';
      state.birthDate = '';
      state.tweets = [];
      state.password = '';
      state.numberOfFollowers = 0;
      state.numberOfFollowings = 0;
    },

    setTweets(state, { payload }) {
      state.tweets = payload;
    },
    addTweet(state) {
      state.numberOfTweets += 1;
    },
    updateTweet(state, { payload }) {
      state.tweets = state.tweets.map((tweet) => {
        if (tweet.id === payload.id) return payload;
        return tweet;
      });
    },
    updatePassword(state, { payload }) {
      state.password = payload;
    },
    deleteTweet(state, { payload }) {
      state.tweets = state.tweets.filter(({ id }) => id !== payload);
      state.numberOfTweets -= 1;
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
  updatePassword,
} = userSlice.actions;
