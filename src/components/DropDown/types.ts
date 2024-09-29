import { Dispatch, SetStateAction } from 'react';

export interface DropDownProps {
  options: string[];
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}
