import { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import styles from './portal.module.scss';
import { PortalProps } from './types';

export const Portal: FC<PortalProps> = ({ children, onClose, title }) => {
  const handleContainerClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);
  return createPortal(
    <div className={styles.popupWrapper} onClick={onClose}>
      <div className={styles.popupContainer} onClick={handleContainerClick}>
        <div className={styles.topPanel}>
          <h3>{title}</h3>
          <button className={styles.close} onClick={onClose} />
        </div>
        <div className={styles.mainContainer}>{children}</div>
      </div>
    </div>,
    document.body!,
  );
};
