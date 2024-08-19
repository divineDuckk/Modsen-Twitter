import { useState, useRef, FC, useEffect } from 'react';

import dropDownSvg from '@/assets/dropdown.svg';

import styles from './dropdown.module.scss';
import { DropDownProps } from './types';

export const DropDown: FC<DropDownProps> = ({ options, value, setValue }) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleOptionClick = (option: string) => {
    setValue(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.dropdown} ref={dropdownRef}>
      <div className={styles.dropdownHeader} onClick={toggleDropdown}>
        {value}
        <img
          src={dropDownSvg}
          alt="drop down icon"
          className={isOpen ? styles.dropdownArrowOpen : ''}
        />
      </div>
      {isOpen && (
        <ul className={styles.dropdownList}>
          {options.map((option, index) => (
            <li
              key={index}
              className={styles.dropdownListItem}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
