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
import { getTweets } from '@/store/selectors/tweets';
import { resetTweets, setTweets } from '@/store/slices/tweetSlice';

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
  const [hasMore, setHasMore] = useState(true);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const dispatch = useAppDispatch();
  const fetchTweets = useCallback(async () => {
    if (isTweetsLoading || !hasMore) return;

    setIsTweetsLoading(true);

    const {
      tweets: newTweets,
      lastVisible: newLastVisible,
      hasMore: moreTweets,
    } = await getTweetsByUserId(uid, 3, lastVisible);

    dispatch(
      setTweets(
        [...tweets, ...newTweets].filter(
          ({ id, userId }, index, self) =>
            uid === userId && index === self.findIndex((t) => t.id === id),
        ),
      ),
    );
    setLastVisible(newLastVisible);
    setHasMore(moreTweets);

    setIsTweetsLoading(false);
  }, [lastVisible, dispatch, hasMore, isTweetsLoading, tweets, uid]);

  useEffect(() => {
    dispatch(resetTweets());
    fetchTweets();
  }, []);
  useEffect(() => {
    dispatch(resetTweets());
  }, [uid]);

  return [tweets, isTweetsLoading, setIsTweetsLoading, fetchTweets];
};
