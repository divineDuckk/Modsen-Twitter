import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';

const initialState: User = {
  displayName: '',
  email: '',
  uid: '',
  followers: 0,
  followings: 0,
  tweetsNumber: 0,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.displayName = payload.displayName;
      state.uid = payload.uid;
      state.email = payload.email;
      state.photoUrl = payload.photoUrl;
      state.phone = payload.phone;
      state.birthDate = payload.birthDate;
      state.tweetsNumber = payload.tweetsNumber;
      state.followers = payload.followers;
      state.followings = payload.followings;
    },
    removeUser(state) {
      state.displayName = '';
      state.email = '';
      state.photoUrl = '';
      state.phone = '';
      state.uid = '';
      state.birthDate = '';
      state.tweetsNumber = 0;
      state.followers = 0;
      state.followings = 0;
    },
  },
});

export default userSlice.reducer;
export const { removeUser, setUser } = userSlice.actions;
