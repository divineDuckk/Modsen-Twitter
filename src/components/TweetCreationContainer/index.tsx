import { ChangeEvent, FC, useState } from 'react';

import { ACCEPT_FILES, LOADING, NOT_LOADED } from '@/constants';
import { addTweetToDb } from '@/api/addTweetToDb';
import { getTweetsByUserId } from '@/api/getTweetsByUserId';
import { useImageState } from '@/hooks/useImageState';
import { useAppDispatch } from '@/store/hooks';
import { setTweets } from '@/store/slices/userSlice';

import { ImageInput } from '../ImageInput';
import { TEXTAREA_PLACEHOLDER } from './constants';
import styles from './tweetCreation.module.scss';
import { TweetCreationContainerProps } from './types';

export const TweetCreationContainer: FC<TweetCreationContainerProps> = ({
  photoURL,
  userId,
  type,
  setIsTweetsLoading,
  page,
}) => {
  const [tweetText, setTweetText] = useState('');
  const { imageUrl, setImageUrl, status, setStatus } = useImageState();

  const dispatch = useAppDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleTweet = async () => {
    if (imageUrl || tweetText) {
      setIsTweetsLoading?.(true);
      await addTweetToDb(tweetText, imageUrl, userId);
      setTweetText('');
      setImageUrl('');
      setIsTweetsLoading?.(false);
      setStatus(NOT_LOADED);
      const { tweets } = await getTweetsByUserId(userId, page);
      dispatch(setTweets(tweets));
    }
  };

  return (
    <div className={styles.tweetCreationContainer}>
      <img src={photoURL} alt="mini avatar" />
      <div className={styles.dataBlock}>
        <textarea
          onChange={handleTextChange}
          placeholder={TEXTAREA_PLACEHOLDER}
          name="tweet data"
          value={tweetText}
        />
        <div className={styles.buttons}>
          <ImageInput
            acceptFiles={ACCEPT_FILES}
            id={type}
            imageStatus={status}
            setPhoto={setImageUrl}
            setPhotoStatus={setStatus}
            title=""
          />
          <button
            onClick={handleTweet}
            className={styles.tweet}
            disabled={status === LOADING}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};
