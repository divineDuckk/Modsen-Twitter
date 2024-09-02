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
import { nextTweets } from '@/store/slices/tweetPageSlice';
import { getCurrentTweetsSize } from '@/store/selectors/page';

export const useGetTweets = (
  uid: string,
): [
  TweetInfo[],
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => Promise<void>,
] => {
  const tweets = useAppSelector(getTweets);
  const [isTweetsLoading, setIsTweetsLoading] = useState(false);
  const page = useAppSelector(getCurrentTweetsSize);
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
    dispatch(nextTweets());
    setIsTweetsLoading(false);
  }, [page, dispatch, hasMore, isTweetsLoading]);

  useEffect(() => {
    fetchTweets();
  }, []);

  return [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets];
};
