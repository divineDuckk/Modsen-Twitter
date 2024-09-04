import { ChangeEvent, FC, useState } from 'react';

import { ACCEPT_FILES, LOADING, NOT_LOADED } from '@/constants';
import { addTweetToDb } from '@/api/addTweetToDb';
import { useImageState } from '@/hooks/useImageState';
import { useAppDispatch } from '@/store/hooks';
import { TweetCreationInfo } from '@/interfaces/tweet';
import { addTweet } from '@/store/slices/tweetSlice';
import { incrementNumberOfTweets } from '@/store/slices/userSlice';

import { ImageInput } from '../ImageInput';
import { TEXTAREA_PLACEHOLDER } from './constants';
import styles from './tweetCreation.module.scss';
import { TweetCreationContainerProps } from './types';

export const TweetCreationContainer: FC<TweetCreationContainerProps> = ({
  photoURL,
  userId,
  type,
  setIsTweetsLoading,
  userName,
  setAllTweets,
}) => {
  const [tweetText, setTweetText] = useState('');
  const { imageUrl, setImageUrl, status, setStatus } = useImageState();
  const [isValidFile, setIsValidFile] = useState(true);

  const dispatch = useAppDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleTweet = async () => {
    if (imageUrl || tweetText) {
      setIsTweetsLoading?.(true);
      const tweetInfo: TweetCreationInfo = {
        tweetText,
        imageUrl,
        userId,
        photoURL,
        userName,
      };
      const tweet = await addTweetToDb(tweetInfo);
      setTweetText('');
      setImageUrl('');

      dispatch(incrementNumberOfTweets());
      dispatch(addTweet(tweet));
      setAllTweets?.((prev) => [...prev, tweet]);

      setIsTweetsLoading?.(false);
      setStatus(NOT_LOADED);
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
            isValidFile={isValidFile}
            setIsValidFile={setIsValidFile}
          />
          <button
            onClick={handleTweet}
            className={styles.tweet}
            disabled={status === LOADING || !isValidFile}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};
