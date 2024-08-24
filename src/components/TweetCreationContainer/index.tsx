import {
  ACCEPT_FILES,
  LOADED,
  LOADING,
  NOT_LOADED,
  SMALL_SIZE,
} from '@/constants';
import { ChangeEvent, FC, useState } from 'react';

import { addImageToStorage } from '@/api/addImageToStorage';
import { addTweetToDb } from '@/api/addTweetToDb';
import { getTweetsByUserId } from '@/api/getTweetsByUserId';
import { Loader } from '@/components/Loader';
import { useImageState } from '@/hooks/useImageState';
import { useAppDispatch } from '@/store/hooks';
import { setTweets } from '@/store/slices/userSlice';
import { checkFileFormat } from '@/utils/functions/checkFileFormat';
import getImage from '@/assets/getImage.svg';
import successLoad from '@/assets/success.png';

import { TEXTAREA_PLACEHOLDER } from './constants';
import styles from './tweetCreation.module.scss';
import { TweetCreationContainerProps } from './types';

export const TweetCreationContainer: FC<TweetCreationContainerProps> = ({
  photoURL,
  userId,
  type,
  setIsTweetsLoading,
}) => {
  const [tweetText, setTweetText] = useState('');
  const { imageUrl, setImageUrl, status, setStatus } = useImageState();

  const dispatch = useAppDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && checkFileFormat(file.name, ACCEPT_FILES)) {
      setStatus(LOADING);
      const downloadUrl = await addImageToStorage(file);
      setImageUrl(downloadUrl);
      setStatus(LOADED);
    }
  };
  const handleTweet = async () => {
    if (imageUrl || tweetText) {
      setIsTweetsLoading?.(true);
      await addTweetToDb(tweetText, imageUrl, userId);
      setTweetText('');
      setImageUrl('');
      setIsTweetsLoading?.(false);
      setStatus(NOT_LOADED);
      const tweets = await getTweetsByUserId(userId);
      console.log(tweets);
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
          <label htmlFor={type} className={styles.getImage}>
            <img src={getImage} alt="choose file img" />
            {status === LOADING && <Loader size={SMALL_SIZE} />}
            {status === LOADED && <img src={successLoad} alt="success" />}
          </label>
          <input
            id={type}
            type="file"
            accept={ACCEPT_FILES}
            onChange={handleFileChange}
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
