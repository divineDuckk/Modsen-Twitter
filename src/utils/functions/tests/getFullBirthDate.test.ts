import { getFullBirthDate } from '@/utils/functions/getFullBirthDate';

describe('getFullBirthDate', () => {
  it('should correctly format a date with single-digit day and month', () => {
    const day = '3';
    const month = 'March';
    const year = '2023';
    const expectedOutput = '03.03.2023';

    const result = getFullBirthDate(day, month, year);

    expect(result).toBe(expectedOutput);
  });

  it('should correctly format a date with two-digit day and month', () => {
    const day = '25';
    const month = 'November';
    const year = '2023';
    const expectedOutput = '25.11.2023';

    const result = getFullBirthDate(day, month, year);

    expect(result).toBe(expectedOutput);
  });

  it('should correctly format a date with single-digit day and two-digit month', () => {
    const day = '9';
    const month = 'October';
    const year = '2023';
    const expectedOutput = '09.10.2023';

    const result = getFullBirthDate(day, month, year);

    expect(result).toBe(expectedOutput);
  });
});
