import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getTheme } from '@/store/selectors/theme';
import { DARK, LIGHT } from '@/constants';
import { setTheme } from '@/store/slices/themeSlice';

import styles from './themeButton.module.scss';

export const ThemeButton = () => {
  const theme = useAppSelector(getTheme);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = useState(theme === DARK);
  const handleChange = () => {
    setChecked((prev) => !prev);
    dispatch(setTheme(!checked ? DARK : LIGHT));
  };
  return (
    <label className={styles.themeButton}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span />
    </label>
  );
};
