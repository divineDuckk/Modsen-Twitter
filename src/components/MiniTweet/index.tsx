import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getUserByUserId } from '@/api/getUserByUserId';
import { User } from '@/interfaces/user';
import { TWEET_ROUTE } from '@/constants';

import styles from './mini.module.scss';
import { MiniTweetProps } from './types';

export const MiniTweet: FC<MiniTweetProps> = ({
  createdAt,
  text,
  userId,
  id,
}) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await getUserByUserId(userId);
      setUser(data!);
    };
    getUserInfo();
  }, []);
  return (
    <Link to={TWEET_ROUTE + id} className={styles.miniTweet}>
      <div>
        <h3>{user?.displayName}</h3>
        <span>{createdAt}</span>
      </div>
      <p>{text}</p>
    </Link>
  );
};
