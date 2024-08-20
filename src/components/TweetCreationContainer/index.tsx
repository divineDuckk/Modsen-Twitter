import { ChangeEvent, FC, useState } from 'react';

import { addImageToStorage } from '@/api/addImageToStorage';
import { addTweetToDb } from '@/api/addTweetToDb';
import { getTweetsByUserId } from '@/api/getTweetsByUserId';
import { SMALL_SIZE } from '@/constants';
import { useAppDispatch } from '@/store/hooks';
import { setTweets } from '@/store/slices/userSlice';
import getImage from '@/assets/getImage.svg';
import successLoad from '@/assets/success.png';

import { Loader } from '../Loader';
import { ACCEPT_FILES, TEXTAREA_PLACEHOLDER } from './constants';
import styles from './tweetCreation.module.scss';
import { TweetCreationContainerProps } from './types';

export const TweetCreationContainer: FC<TweetCreationContainerProps> = ({
  photoURL,
  userId,
  setIsTweetsLoading,
}) => {
  const [imageUrl, setImageUrl] = useState('');
  const [tweetText, setTweetText] = useState('');
  const [isImageLoad, setIsImageLoad] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTweetText(e.target.value);
  };

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setIsImageLoad(false);
    setIsLoading(true);
    if (file) {
      const downloadUrl = await addImageToStorage(file);
      setImageUrl(downloadUrl);
      setIsLoading(false);
      setIsImageLoad(true);
    }
  };
  const handleTweet = async () => {
    if (imageUrl || tweetText) {
      setIsTweetsLoading(true);
      await addTweetToDb(tweetText, imageUrl, userId);
      setTweetText('');
      setImageUrl('');
      setIsImageLoad(false);
      setIsTweetsLoading(false);
      const tweets = await getTweetsByUserId(userId);
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
          <label htmlFor="file-upload" className={styles.getImage}>
            <img src={getImage} alt="choose file img" />
            {isLoading && <Loader size={SMALL_SIZE} />}
            {isImageLoad && <img src={successLoad} alt="success" />}
          </label>
          <input
            id="file-upload"
            type="file"
            accept={ACCEPT_FILES}
            onChange={handleFileChange}
          />
          <button
            onClick={handleTweet}
            className={styles.tweet}
            disabled={isLoading}
          >
            Tweet
          </button>
        </div>
      </div>
    </div>
  );
};
