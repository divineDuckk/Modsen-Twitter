import { ErrorInfo } from '@/components/ErrorInfo';

import styles from './inProgres.module.scss';

export const InProgress = () => {
  return (
    <div className={styles.inProgress}>
      <ErrorInfo addictionalText="page still developing" />
    </div>
  );
};
