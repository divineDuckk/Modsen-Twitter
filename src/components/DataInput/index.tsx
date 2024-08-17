import { ChangeEvent, FC } from 'react';

import { DataInputProps } from './types';

export const DataInput: FC<DataInputProps> = ({
  inputValue,
  setInputValue,
  type,
  placeholder,
  required,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <input
      value={inputValue}
      placeholder={placeholder}
      type={type}
      onChange={handleChange}
      required={required}
    />
  );
};
