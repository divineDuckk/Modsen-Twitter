import { getYearsArray } from '@/utils/functions/getYearsArray';
import { YEARS_INTERVAl } from '@/constants';

describe('getYearsArray', () => {
  it('should return an array of years from current year to (current year - YEARS_INTERVAl)', () => {
    const currentYear = new Date().getFullYear();
    const expectedYearsArray = Array.from(
      { length: YEARS_INTERVAl + 1 },
      (_, index) => String(currentYear - YEARS_INTERVAl + index),
    );

    const result = getYearsArray();

    expect(result).toEqual(expectedYearsArray);
  });

  it('should return an array with correct number of years', () => {
    const expectedLength = YEARS_INTERVAl + 1;
    const result = getYearsArray();

    expect(result.length).toBe(expectedLength);
  });

  it('should include the current year in the array', () => {
    const currentYear = new Date().getFullYear();
    const result = getYearsArray();

    expect(result).toContain(String(currentYear));
  });
});
