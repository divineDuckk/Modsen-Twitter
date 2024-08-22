import { Dispatch, SetStateAction } from 'react';

export interface TweetCreationContainerProps {
  photoURL: string;
  userId: string;
  type: string;
  setIsTweetsLoading?: Dispatch<SetStateAction<boolean>>;
}
