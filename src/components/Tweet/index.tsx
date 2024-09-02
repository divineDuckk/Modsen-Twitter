import { FC, Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { deleteTweet, updateTweet } from '@/store/slices/tweetSlice';
import { deleteTweetFromDb } from '@/api/deleteTweetFromDb';
import { toggleLike } from '@/api/toggleLike';
import { TweetInfo } from '@/interfaces/tweet';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteTweet, updateTweet } from '@/store/slices/userSlice';
import { getUser } from '@/store/selectors/user';
import { PROFILE_ROUTE } from '@/constants';
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
  updateTweetInHome,
}) => {
  const { uid: currUserId } = useAppSelector(getUser);
  const [isLike, setIsLike] = useState(userLikes.includes(currUserId));
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const isOwner = userNameId === currUserId;
  const isInHome = useLocation().pathname.includes('home');
  const handleSettingsClick = () => {
    setIsSettingsOpen((prev) => !prev);
  };
  const handleDelete = () => {
    dispatch(deleteTweet(id));
    deleteTweetFromDb(id, userNameId);
  };

  const handleLike = async () => {
    setIsLike((prev) => !prev);
    const updatedLikes = !isLike ? likes + 1 : likes - 1;
    const tweet: TweetInfo = {
      id,
      createdAt,
      imageUrl,
      likes: updatedLikes,
      text: content,
      userId: userNameId,
      userLikes: !isLike
        ? [...userLikes, currUserId]
        : userLikes.filter((id) => id !== currUserId),
      authorName: userName,
      authorPhoto: userPhotoUrl,
    };
    dispatch(updateTweet(tweet));
    updateTweetInHome?.(tweet);
    await toggleLike(id, isLike, currUserId!);
  };

  return (
    <div className={styles.tweet}>
      <img className={styles.userPhoto} src={userPhotoUrl} alt="mini avatar" />
      <div className={styles.tweetInfo}>
        <div className={styles.userInfo}>
          <div className={styles.meta}>
            <Link data-testid="profileLink" to={PROFILE_ROUTE + userNameId}>
              <h3>{userName}</h3>
              <span>{`@${userName}_${userNameId}`}</span>
            </Link>
            <span>{createdAt}</span>
          </div>
          {isOwner && !isInHome && (
            <button onClick={handleSettingsClick}>
              <img src={settings} alt="settings" />
              {isSettingsOpen && <OptionMenu handleDelete={handleDelete} />}
            </button>
          )}
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
          {imageUrl && (
            <img className={styles.image} src={imageUrl} alt="your image" />
          )}
        </div>
        <div className={styles.likesInfo}>
          <button onClick={handleLike}>
            <img src={isLike ? redLike : like} alt="like" />
          </button>
          <span data-testid="likesSpan">{likes}</span>
        </div>
      </div>
    </div>
  );
};
