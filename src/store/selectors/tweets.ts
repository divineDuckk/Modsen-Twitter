import { RootState } from '@/store/types';

export const getTweets = (state: RootState) => state.tweets.tweets;
