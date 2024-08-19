import { useSelector } from 'react-redux';

import { getUser } from '@/store/selectors/user';
import { TweetCreationContainer } from '@/components/TweetCreationContainer';

import styles from './profile.module.scss';

export const Profile = () => {
  const {
    displayName,
    tweetsNumber,
    backgroundUrl,
    photoURL,
    uid,
    description,
    followers,
    followings,
  } = useSelector(getUser);

  console.log(photoURL);
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h4>{displayName}</h4>
        <span>{tweetsNumber} Tweets</span>
        <img src={backgroundUrl} alt="background" />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.imgWithEdits}>
          <img src={photoURL} alt="avatar" />
          <button>Edit profile</button>
        </div>
        <h3>{displayName}</h3>
        <p className={styles.id}>@{displayName + '_' + uid}</p>
        <p className={styles.description}>{description}</p>
        <div className={styles.followsInfo}>
          <p>
            {followings} <span>Following</span>
          </p>
          <p>
            {followers} <span>Followers</span>
          </p>
        </div>
      </div>
      <TweetCreationContainer photoURL={photoURL} />
    </div>
  );
};
