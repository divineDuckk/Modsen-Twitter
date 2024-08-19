import { YEARS_INTERVAl } from '@/constants';

export const getYearsArray = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from({ length: YEARS_INTERVAl + 1 }, (_, index) =>
    String(currentYear - YEARS_INTERVAl + index),
  );
  return yearsArray;
};
