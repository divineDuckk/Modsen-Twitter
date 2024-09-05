import classNames from 'classnames';
import { FC } from 'react';

import { LARGE_SIZE, MEDIUM_SIZE, SMALL_SIZE } from '@/constants';

import styles from './loader.module.scss';
import { LoaderProps } from './types';

export const Loader: FC<LoaderProps> = ({ size }) => {
  const loaderClass = classNames(styles.loader, {
    [styles.large]: size === LARGE_SIZE,
    [styles.medium]: size === MEDIUM_SIZE,
    [styles.small]: size === SMALL_SIZE,
  });
  return (
    <div data-testid="loader" className={styles.loaderWrap}>
      <div className={loaderClass} />
    </div>
  );
};
