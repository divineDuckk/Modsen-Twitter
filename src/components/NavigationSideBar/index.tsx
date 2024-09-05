import classNames from 'classnames';
import { useMemo, useState } from 'react';
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

  const address = useMemo(() => {
    let path = pathname.split('/').pop();
    return path === uid ? PROFILE : path;
  }, [pathname, uid]);

  const navLinks = useMemo(
    () =>
      LINKS.map(({ title, svg }) => {
        const lowTitle = title.toLowerCase();
        const linkClassname = classNames({
          [styles.active]: lowTitle === address,
        });
        return (
          <li key={title}>
            <Link to={`/${lowTitle}`} className={linkClassname}>
              {svg}
              <span>{title}</span>
            </Link>
          </li>
        );
      }),
    [address],
  );

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
        <ul className={styles.nav}>{navLinks}</ul>
        <button onClick={handlePopupOpen} className={styles.submitButton}>
          Tweet
        </button>
        <div className={styles.userContainer}>
          <img src={photoURL} alt="photo" />
          <p>{displayName}</p>
        </div>
        <button onClick={handleLogOut} className={styles.submitButton}>
          <span>Log out</span>
          <svg
            fill="#000000"
            height="800px"
            width="800px"
            version="1.1"
            id="Capa_1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384.971 384.971"
          >
            <g>
              <g id="Sign_Out">
                <path
                  d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
			C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
			C192.485,366.299,187.095,360.91,180.455,360.91z"
                />
                <path
                  d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
			c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
			c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"
                />
              </g>
            </g>
          </svg>
        </button>
      </div>
      {isPopupOpen && (
        <Portal onClose={handlePopupClose} title="Add Tweet">
          <TweetCreationContainer
            photoURL={photoURL}
            userId={uid}
            type="modal"
            userName={displayName}
          />
        </Portal>
      )}
    </>
  );
};
