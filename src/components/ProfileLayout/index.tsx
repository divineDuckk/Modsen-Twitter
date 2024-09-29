import classNames from 'classnames';
import { FC, PropsWithChildren } from 'react';
import { useLocation } from 'react-router-dom';

import { NavigationSideBar } from '@/components/NavigationSideBar';
import { SearchSideBar } from '@/components/SearchSideBar';
import { EXPLORE_ROUTE } from '@/constants';

import styles from './layout.module.scss';

export const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
  const atExplore = useLocation().pathname.includes(EXPLORE_ROUTE);
  const searchClass = classNames(styles.searchWrapper, {
    [styles.unvisible]: atExplore,
  });
  return (
    <div className={styles.profileLayout}>
      <NavigationSideBar />
      {children}
      <div className={searchClass}>
        <SearchSideBar />
      </div>
    </div>
  );
};
