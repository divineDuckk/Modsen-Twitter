import { FC, useEffect, useState } from 'react';

import { getUserByUserId } from '@/api/getUserByUserId';
import { User } from '@/interfaces/user';

import styles from './mini.module.scss';
import { MiniTweetProps } from './types';

export const MiniTweet: FC<MiniTweetProps> = ({ createdAt, text, userId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const getUserInfo = async () => {
      const data = await getUserByUserId(userId);
      setUser(data!);
    };
    getUserInfo();
  }, []);
  return (
    <div className={styles.miniTweet}>
      <div>
        <h3>{user?.displayName}</h3>
        <span>{createdAt}</span>
      </div>
      <p>{text}</p>
    </div>
  );
};
