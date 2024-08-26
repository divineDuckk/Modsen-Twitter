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
import { PAGE_SIZE } from '@/constants';

export const useGetTweets = (
  uid: string,
): [
  TweetInfo[],
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => Promise<void>,
  number,
] => {
  const tweets = useAppSelector(getTweets);
  const [isTweetsLoading, setIsTweetsLoading] = useState(false);
  const [page, setPage] = useState(PAGE_SIZE);
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
    setPage((prev) => prev + PAGE_SIZE);
    setIsTweetsLoading(false);
  }, [page]);

  useEffect(() => {
    fetchTweets();
  }, []);

  return [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets, page];
};
