import classNames from 'classnames';
import { FC } from 'react';


import styles from './loader.module.scss';
import { LoaderProps } from './types';

import { LARGE_SIZE, MEDIUM_SIZE, SMALL_SIZE } from '@/constants';

export const Loader: FC<LoaderProps> = ({ size }) => {
  const loaderClass = classNames(styles.loader, {
    [styles.large]: size === LARGE_SIZE,
    [styles.medium]: size === MEDIUM_SIZE,
    [styles.small]: size === SMALL_SIZE,
  });
  return (
    <div className={styles.loaderWrap}>
      <div className={loaderClass} />
    </div>
  );
};
