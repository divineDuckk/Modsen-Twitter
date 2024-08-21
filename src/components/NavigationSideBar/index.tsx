import { Link, useLocation } from 'react-router-dom';

import { getUser } from '@/store/selectors/user';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { deleteUser } from '@/store/slices/userSlice';
import logo from '@/assets/twitter-logo.svg';

import { LINKS } from './constants';
import styles from './sidebar.module.scss';

export const NavigationSideBar = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { photoURL, displayName, uid } = useAppSelector(getUser);

  let address = pathname.split('/').pop();

  const handleLogOut = () => {
    dispatch(deleteUser());
  };

  return (
    <div className={styles.sidebar}>
      <img className={styles.logo} src={logo} alt="logo" />
      <ul className={styles.nav}>
        {LINKS.map(({ activeIcon, icon, title }) => {
          const lowTitle = title.toLowerCase();
          if (address === uid) {
            address = 'profile';
          }
          return (
            <li key={title}>
              <img
                src={address === lowTitle ? activeIcon : icon}
                alt={`${title} icon`}
              />
              <Link to={`/${title}`}>{title}</Link>
            </li>
          );
        })}
      </ul>
      <button className={styles.submitButton}>Tweet</button>
      <div className={styles.userContainer}>
        <img src={photoURL} alt="photo" />
        <p>{displayName}</p>
      </div>
      <button onClick={handleLogOut} className={styles.submitButton}>
        Log out
      </button>
    </div>
  );
};
