import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { getTweetsByUserId } from '@/api/getTweetsByUserId';
import { TweetInfo } from '@/interfaces/tweet';
import { getTweets } from '@/store/selectors/user';
import { setTweets } from '@/store/slices/userSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export const useGetTweets = (
  uid: string,
): [TweetInfo[], boolean, Dispatch<SetStateAction<boolean>>] => {
  const tweets = useAppSelector(getTweets);
  const [isTweetsLoading, setIsTweetsLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setIsTweetsLoading(true);
    const getTweets = async () => {
      const tweets = await getTweetsByUserId(uid);
      dispatch(setTweets(tweets));
      setIsTweetsLoading(false);
    };

    getTweets();
  }, []);
  return [tweets, isTweetsLoading, setIsTweetsLoading];
};
