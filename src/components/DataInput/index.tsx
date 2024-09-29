import { ForwardedRef, forwardRef } from 'react';

import styles from './input.module.scss';
import { DataInputProps } from './types';

export const DataInput = forwardRef<HTMLInputElement, DataInputProps>(
  (
    { type, placeholder, error, ...props },
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const errorMessage = error ? String(error) : '';

    return (
      <>
        <input
          className={styles.dataInput}
          placeholder={placeholder}
          type={type}
          ref={ref}
          {...props}
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      </>
    );
  },
);
