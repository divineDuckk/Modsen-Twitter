import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Tweet } from '@/components/Tweet';
import { TweetInfo } from '@/interfaces/tweet';
import { getTweetById } from '@/api/getTweetById';
import { Loader } from '@/components/Loader';
import { LARGE_SIZE } from '@/constants';

import styles from './tweet.module.scss';

export const SeparateTweet = () => {
  const { id } = useParams();
  const [tweet, setTweet] = useState<TweetInfo | null>(null);
  const [isTweetLoading, setIsTweetLoading] = useState(false);

  useEffect(() => {
    const getTweet = async () => {
      try {
        setIsTweetLoading(true);
        const tweetInfo = await getTweetById(id!);
        setTweet(tweetInfo!);
        setIsTweetLoading(false);
      } catch (error) {
        console.error('Failed to fetch tweet:', error);
        setIsTweetLoading(false);
      }
    };
    getTweet();
  }, [id]);

  if (isTweetLoading) {
    return (
      <div className={styles.tweetContainer}>
        <Loader size={LARGE_SIZE} />;
      </div>
    );
  }

  if (!tweet) {
    return <div>No tweet found or failed to load.</div>;
  }

  const {
    authorName,
    authorPhoto,
    createdAt,
    imageUrl,
    likes,
    text,
    userId,
    userLikes,
  } = tweet;

  return (
    <div className={styles.tweetContainer}>
      <Tweet
        content={text}
        createdAt={createdAt}
        id={id!}
        imageUrl={imageUrl}
        likes={likes}
        userLikes={userLikes}
        userName={authorName}
        userNameId={userId}
        userPhotoUrl={authorPhoto}
      />
    </div>
  );
};
