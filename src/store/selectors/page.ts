import { RootState } from '@/store/types';

export const getCurrentTweetsSize = (state: RootState) => state.page.page;
export const getCurrentTweetsSizeInHome = (state: RootState) =>
  state.page.pageForAllTweets;
