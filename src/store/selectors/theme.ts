import { RootState } from '@/store/types';

export const getTheme = (state: RootState) => state.theme.name;
