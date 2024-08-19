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
  tweetsNumber: 0,
  photoURL: defaultAvatar,
  backgroundUrl: defaultBg,
  description: '',
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
  },
});

export default userSlice.reducer;
export const { removeUser, setUser } = userSlice.actions;
