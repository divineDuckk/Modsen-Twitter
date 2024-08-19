import { FC } from 'react';

import getImage from '@/assets/getImage.svg';

import { TEXTAREA_PLACEHOLDER } from './constants';
import styles from './tweetCreation.module.scss';
import { TweetCreationContainerProps } from './types';

export const TweetCreationContainer: FC<TweetCreationContainerProps> = ({
  photoURL,
}) => {
  return (
    <div className={styles.tweetCreationContainer}>
      <img src={photoURL} alt="mini avatar" />
      <div className={styles.dataBlock}>
        <textarea placeholder={TEXTAREA_PLACEHOLDER} name="tweet data" />
        <div className={styles.buttons}>
          <button>
            <img src={getImage} alt="choose file img" />
          </button>
          <button>Tweet</button>
        </div>
      </div>
    </div>
  );
};
