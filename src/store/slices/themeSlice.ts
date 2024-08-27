import { createSlice } from '@reduxjs/toolkit';
import { LIGHT } from '@/constants';
import { ThemeState } from '@/interfaces/theme';

const initialState: ThemeState = {
  name: LIGHT,
};
const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.name = payload;
    },
  },
});

export default themeSlice.reducer;
export const { setTheme } = themeSlice.actions;
