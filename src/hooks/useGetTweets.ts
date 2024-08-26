import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getTweetsByUserId } from '@/api/getTweetsByUserId';
import { TweetInfo } from '@/interfaces/tweet';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTweets } from '@/store/selectors/user';
import { setTweets } from '@/store/slices/userSlice';

export const useGetTweets = (
  uid: string,
): [
  TweetInfo[],
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => Promise<void>,
  Dispatch<SetStateAction<number>>,
  boolean,
] => {
  const tweets = useAppSelector(getTweets);
  const [isTweetsLoading, setIsTweetsLoading] = useState(false);
  const [page, setPage] = useState(3);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useAppDispatch();

  const fetchTweets = useCallback(async () => {
    if (isTweetsLoading || !hasMore) return;
    setIsTweetsLoading(true);
    const { tweets: newTweets, hasMore: moreTweets } = await getTweetsByUserId(
      uid,
      page,
    );
    dispatch(setTweets(newTweets));
    setHasMore(moreTweets);
    setPage((prev) => prev + 3);
    setIsTweetsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchTweets();
  }, []);

  return [
    tweets,
    isTweetsLoading,
    setIsTweetsLoading,
    fetchTweets,
    setPage,
    hasMore,
  ];
};
