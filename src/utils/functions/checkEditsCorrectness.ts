import { ERRORS, PHONE_REGEXP, YEARS_INTERVAl } from '@/constants';

export const checkEditsCorrectness = (
  name: string,
  phone: string,
  birthdate: string,
) => {
  if (!name) return ERRORS.emptyName;
  if (phone && !PHONE_REGEXP.test(phone)) return ERRORS.phoneError;

  if (!birthdate.length) return ERRORS.noProblems;
  const year = +birthdate?.split('-')[0];
  const currYear = new Date().getFullYear();
  const minYear = currYear - YEARS_INTERVAl;
  if (year < minYear || year > currYear) return ERRORS.birthDateError;
  return ERRORS.noProblems;
};
