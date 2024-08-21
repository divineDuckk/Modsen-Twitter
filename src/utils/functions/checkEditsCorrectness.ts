import {
  ERRORS,
  PASSWORD_MIN_LENGTH,
  PHONE_REGEXP,
  YEARS_INTERVAl,
} from '@/constants';

export const checkEditsCorrectness = (
  name: string,
  email: string,
  password: string,
  phone: string,
  birthdate: string,
) => {
  if (!name) return ERRORS.emptyName;
  if (!email) return ERRORS.emptyEmail;
  if (password && password.length < PASSWORD_MIN_LENGTH)
    return ERRORS.shortPassword;
  if (phone && !PHONE_REGEXP.test(phone)) return ERRORS.phoneError;

  if (!birthdate.length) return ERRORS.noProblems;
  const year = +birthdate?.split('-')[0];
  const currYear = new Date().getFullYear();
  const minYear = currYear - YEARS_INTERVAl;
  if (year < minYear || year > currYear) return ERRORS.birthDateError;
  return ERRORS.noProblems;
};
