import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getCurrentTweetsSizeInHome } from '@/store/selectors/page';
import { TweetInfo } from '@/interfaces/tweet';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { nextTweetsInHome } from '@/store/slices/tweetPageSlice';
import { getAllTweets } from '@/api/getAllTweets';

export const useGetAllTweets = (): [
  TweetInfo[],
  boolean,
  Dispatch<SetStateAction<boolean>>,
  () => Promise<void>,
  Dispatch<SetStateAction<TweetInfo[]>>,
] => {
  const [tweets, setTweets] = useState<TweetInfo[]>([]);
  const [isTweetsLoading, setIsTweetsLoading] = useState(false);
  const page = useAppSelector(getCurrentTweetsSizeInHome);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useAppDispatch();
  const fetchTweets = useCallback(async () => {
    if (isTweetsLoading || !hasMore) return;

    setIsTweetsLoading(true);
    const { tweets: newTweets, hasMore: moreTweets } = await getAllTweets(page);
    setTweets(newTweets);
    setHasMore(moreTweets);
    dispatch(nextTweetsInHome());
    setIsTweetsLoading(false);
  }, [page, dispatch, hasMore, isTweetsLoading]);
  useEffect(() => {
    fetchTweets();
  }, []);

  return [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets, setTweets];
};
