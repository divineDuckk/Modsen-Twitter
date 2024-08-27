import { FC } from 'react';
import { Link } from 'react-router-dom';

import { PROFILE_ROUTE } from '@/constants';
import { useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';
import { useFollow } from '@/hooks/useFollow';

import styles from './miniUserProfile.module.scss';
import { MiniUserProfileProps } from './types';

export const MiniUserProfile: FC<MiniUserProfileProps> = ({
  name,
  photo,
  uid,
}) => {
  const { uid: myId } = useAppSelector(getUser);
  const { handleFollow, isFollowed } = useFollow(uid, myId);
  return (
    <div className={styles.miniProfole}>
      <Link to={PROFILE_ROUTE + uid}>
        <img src={photo} alt="user photo" />
        <div>
          <h2>{name}</h2>
          <p>{`${name}_${uid}`}</p>
        </div>
      </Link>
      <button className={styles.follow} onClick={handleFollow}>
        {isFollowed ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};
