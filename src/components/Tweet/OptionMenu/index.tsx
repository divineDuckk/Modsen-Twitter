import { FC, Fragment } from 'react';

import { OPTIONS } from './constants';
import styles from './menu.module.scss';
import { OptionMenuProps } from './types';

export const OptionMenu: FC<OptionMenuProps> = ({ handleDelete }) => {
  return (
    <ul className={styles.optionMenu}>
      {Object.keys(OPTIONS).map(option => {
        switch (option) {
          case OPTIONS.delete:
            return (
              <li key={option} onClick={handleDelete}>
                {option}
              </li>
            );
          default:  
            return <Fragment key={option} />;
        }
      })}
    </ul>
  );
};
