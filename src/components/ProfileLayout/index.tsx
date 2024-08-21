import { FC, PropsWithChildren } from 'react';

import { NavigationSideBar } from '@/components/NavigationSideBar';

import styles from './layout.module.scss';

export const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.profileLayout}>
      <NavigationSideBar />
      {children}
    </div>
  );
};
