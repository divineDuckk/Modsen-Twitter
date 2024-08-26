import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn,
} from 'react-hook-form';

export interface DataInputProps {
  type: string;
  placeholder: string;
  register?: UseFormRegisterReturn;
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
}
