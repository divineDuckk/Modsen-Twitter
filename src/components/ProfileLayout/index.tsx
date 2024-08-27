import { FC, PropsWithChildren } from 'react';

import { NavigationSideBar } from '@/components/NavigationSideBar';
import { SearchSideBar } from '@/components/SearchSideBar';

import styles from './layout.module.scss';

export const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.profileLayout}>
      <NavigationSideBar />
      {children}
      <SearchSideBar />
    </div>
  );
};
