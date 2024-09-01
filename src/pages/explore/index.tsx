import { SearchSideBar } from '@/components/SearchSideBar';

import styles from './explore.module.scss';

export const Explore = () => {
  return (
    <div className={styles.explore}>
      <SearchSideBar />
    </div>
  );
};
