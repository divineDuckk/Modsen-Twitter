import { FC } from 'react';

import styles from './error.module.scss';
import { ErrorInfoProps } from './types';

export const ErrorInfo: FC<ErrorInfoProps> = ({
  addictionalText = 'something went wrong',
  headerText = 'Oops...',
}) => {
  return (
    <div className={styles.errorInfo}>
      <h2>{headerText}</h2>
      <h3>{addictionalText}</h3>
    </div>
  );
};
