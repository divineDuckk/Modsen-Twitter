import { Dispatch, SetStateAction } from 'react';

export interface TweetCreationContainerProps {
  photoURL: string;
  userId: string;
  setIsTweetsLoading: Dispatch<SetStateAction<boolean>>;
}
