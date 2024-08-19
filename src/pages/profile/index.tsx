import { useSelector } from 'react-redux';

import { getUser } from '@/store/selectors/user';

import styles from './profile.module.scss';

export const Profile = () => {
  const { displayName, tweetsNumber } = useSelector(getUser);
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <h3>{displayName}</h3>
        <span>{tweetsNumber}</span>
      </div>
    </div>
  );
};
