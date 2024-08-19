import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/interfaces/user';

const initialState: User = {
  displayName: '',
  email: '',
  uid: '',
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
    },
    removeUser(state) {
      state.displayName = '';
      state.email = '';
      state.photoUrl = '';
      state.phone = '';
      state.uid = '';
      state.birthDate = '';
    },
  },
});

export default userSlice.reducer;
export const { removeUser, setUser } = userSlice.actions;
