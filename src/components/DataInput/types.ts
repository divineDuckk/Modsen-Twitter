import { Dispatch, SetStateAction } from 'react';

export interface DataInputProps {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  type: string;
  placeholder: string;
  required?: boolean;
}
