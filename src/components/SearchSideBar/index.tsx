import { ChangeEvent, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { PROFILE } from '@/constants';
import search from '@/assets/search.svg';

import { PROFILE_PLACCEHOLDER, USER_PLACCEHOLDER } from './constants';
import { DataList } from './DataList';
import styles from './search.module.scss';

export const SearchSideBar = () => {
  const { pathname } = useLocation();
  const placeholder = pathname.includes(PROFILE)
    ? PROFILE_PLACCEHOLDER
    : USER_PLACCEHOLDER;

  const [text, setText] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setText(value);
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.inputWrapper}>
        <img src={search} alt="search" />
        <input onChange={handleChange} value={text} placeholder={placeholder} />
      </div>
      <DataList query={text} />
    </div>
  );
};
