import { Dispatch, SetStateAction } from 'react';

import { TweetInfo } from '@/interfaces/tweet';

export interface TweetCreationContainerProps {
  photoURL: string;
  userId: string;
  type: string;
  setIsTweetsLoading?: Dispatch<SetStateAction<boolean>>;
  page: number;
  userName: string;
  setAllTweets?: Dispatch<SetStateAction<TweetInfo[]>>;
}
