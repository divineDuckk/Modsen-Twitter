import { MONTHS } from '@/constants';

export const getFullBirthDate = (day: string, month: string, year: string) => {
  const monthIndex = MONTHS.indexOf(month) + 1;
  const formattedMonth = monthIndex.toString().padStart(2, '0');
  const formattedDay = day.padStart(2, '0');

  return `${formattedDay}.${formattedMonth}.${year}`;
};
