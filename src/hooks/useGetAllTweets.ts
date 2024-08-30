import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TweetInfo } from '@/interfaces/tweet';
import { useAppDispatch } from '@/store/hooks';
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
  const [lastVisible, setLastVisible] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useAppDispatch();
  const fetchTweets = useCallback(async () => {
    if (isTweetsLoading || !hasMore) return;

    setIsTweetsLoading(true);
    const {
      tweets: newTweets,
      lastVisible: lastTweet,
      hasMore: moreTweets,
    } = await getAllTweets(3, lastVisible);

    if (newTweets.length === 0) setHasMore(false);

    setTweets((prevTweets) => [...prevTweets, ...newTweets]);
    setLastVisible(lastTweet);
    setHasMore(moreTweets);
    setIsTweetsLoading(false);
  }, [lastVisible, dispatch, hasMore, isTweetsLoading]);

  useEffect(() => {
    fetchTweets();
  }, []);

  return [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets, setTweets];
};
