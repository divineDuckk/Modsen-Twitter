import { FC, Fragment, useEffect, useRef } from 'react';

import { OPTIONS } from './constants';
import styles from './menu.module.scss';
import { OptionMenuProps } from './types';

export const OptionMenu: FC<OptionMenuProps> = ({
  handleDelete,
  handleClose,
}) => {
  const menuRef = useRef<HTMLUListElement>(null);

  const handleClickOutside = (event: Event) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <ul className={styles.optionMenu} ref={menuRef}>
      {Object.keys(OPTIONS).map((option) => {
        switch (option) {
          case OPTIONS.delete:
            return (
              <li data-testid="deleteTweet" key={option} onClick={handleDelete}>
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
