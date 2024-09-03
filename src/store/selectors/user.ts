import { RootState } from '@/store/types';

export const getUser = (state: RootState) => state.user;
export const getTweets = (state: RootState) => state.user.tweets;
