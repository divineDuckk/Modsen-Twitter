import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Portal } from '@/components/Portal';
import { TweetCreationContainer } from '@/components/TweetCreationContainer';
import { PROFILE } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getUser } from '@/store/selectors/user';
import { deleteUser } from '@/store/slices/userSlice';
import logo from '@/assets/twitter-logo.svg';

import { LINKS } from './constants';
import styles from './sidebar.module.scss';

export const NavigationSideBar = () => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { photoURL, displayName, uid } = useAppSelector(getUser);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  let address = pathname.split('/').pop();

  const handleLogOut = () => {
    dispatch(deleteUser());
  };

  const handlePopupOpen = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className={styles.sidebar}>
        <img className={styles.logo} src={logo} alt="logo" />
        <ul className={styles.nav}>
          {LINKS.map(({ activeIcon, icon, title }) => {
            const lowTitle = title.toLowerCase();
            if (address === uid) {
              address = PROFILE;
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
        <button onClick={handlePopupOpen} className={styles.submitButton}>
          Tweet
        </button>
        <div className={styles.userContainer}>
          <img src={photoURL} alt="photo" />
          <p>{displayName}</p>
        </div>
        <button onClick={handleLogOut} className={styles.submitButton}>
          Log out
        </button>
      </div>
      {isPopupOpen && (
        <Portal onClose={handlePopupClose} title="Add Tweet">
          <TweetCreationContainer
            photoURL={photoURL}
            userId={uid}
            type="modal"
          />
        </Portal>
      )}
    </>
  );
};
