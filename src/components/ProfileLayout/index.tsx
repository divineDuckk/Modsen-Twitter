import { FC, PropsWithChildren } from 'react';

import styles from './layout.module.scss';

export const ProfileLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.profileLayout}>{children}</div>;
};
