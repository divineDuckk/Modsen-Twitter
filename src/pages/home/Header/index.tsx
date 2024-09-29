import { ThemeButton } from '@/components/ThemeButton';

import styles from './header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h2>Home</h2>
      <ThemeButton />
    </header>
  );
};
