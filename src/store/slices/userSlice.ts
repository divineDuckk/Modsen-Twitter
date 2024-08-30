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
    incrementNumberOfTweets(state) {
      state.numberOfTweets += 1;
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
      state.password = '';
      state.numberOfFollowers = 0;
      state.numberOfFollowings = 0;
    },

    updatePassword(state, { payload }) {
      state.password = payload;
    },
    decrementNumberOfTweets(state) {
      state.numberOfTweets -= 1;
    },
  },
});

export default userSlice.reducer;
export const {
  incrementNumberOfTweets,
  deleteUser,
  setUser,
  updatePassword,
  decrementNumberOfTweets,
} = userSlice.actions;
