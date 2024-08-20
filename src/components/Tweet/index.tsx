import { FC, Fragment, useState } from 'react';

import { toggleLike } from '@/api/toggleLike';
import { useAppDispatch } from '@/store/hooks';
import { deleteTweet, updateTweet } from '@/store/slices/userSlice';
import { TweetInfo } from '@/interfaces/tweet';
import { deleteTweetFromDb } from '@/api/deleteTweetFromDb';
import like from '@/assets/like.svg';
import redLike from '@/assets/redLike.svg';
import settings from '@/assets/settings.svg';

import { OptionMenu } from './OptionMenu';
import styles from './tweet.module.scss';
import { TweetProps } from './types';

export const Tweet: FC<TweetProps> = ({
  content,
  createdAt,
  imageUrl,
  likes,
  userName,
  userNameId,
  userPhotoUrl,
  id,
  userLikes,
}) => {
  const [isLike, setIsLike] = useState(userLikes.includes(userNameId));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const dispatch = useAppDispatch();

  const handleSettingsClick = () => {
    setIsSettingsOpen(prev => !prev);
  };

  const handleDelete = async () => {
    dispatch(deleteTweet(id));
    await deleteTweetFromDb(id);
  };

  const handleLike = async () => {
    setIsLike(prev => !prev);

    const tweet: TweetInfo = {
      id: id,
      createdAt: createdAt,
      imageUrl: imageUrl,
      likes: !isLike ? likes + 1 : likes - 1,
      text: content,
      userId: userNameId,
      userLikes: userLikes,
    };
    dispatch(updateTweet(tweet));
    await toggleLike(id, isLike, userNameId);
  };

  return (
    <div className={styles.tweet}>
      <img className={styles.userPhoto} src={userPhotoUrl} alt="mini avatar" />
      <div className={styles.tweetInfo}>
        <div className={styles.userInfo}>
          <div>
            <h3>{userName}</h3>
            <span>{`@${userName}_${userNameId}`}</span>
            <span>{createdAt}</span>
          </div>
          <button onClick={handleSettingsClick}>
            <img src={settings} alt="settings" />
            {isSettingsOpen && <OptionMenu handleDelete={handleDelete} />}
          </button>
        </div>
        <p>
          {content.split('\n').map((line, index) => (
            <Fragment key={index}>
              {line}
              <br />
            </Fragment>
          ))}
        </p>
        <div className={styles.imgWrapper}>
          <img className={styles.image} src={imageUrl} alt="your image" />
        </div>
        <div className={styles.likesInfo}>
          <button onClick={handleLike}>
            <img src={isLike ? redLike : like} alt="like" />
          </button>
          <span>{likes}</span>
        </div>
      </div>
    </div>
  );
};
