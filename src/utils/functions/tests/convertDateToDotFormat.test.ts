import { convertDateToDotFormat } from '@/utils/functions/converDateToDotFormat';

describe('convertDateToDotFormat', () => {
  it('should convert date from YYYY-MM-DD to DD.MM.YYYY', () => {
    const inputDate = '2023-09-01';
    const expectedOutput = '01.09.2023';

    const result = convertDateToDotFormat(inputDate);

    expect(result).toBe(expectedOutput);
  });

  it('should return the same date if it is already in DD.MM.YYYY format', () => {
    const inputDate = '01.09.2023';
    const expectedOutput = '01.09.2023';

    const result = convertDateToDotFormat(inputDate);

    expect(result).toBe(expectedOutput);
  });

  it('should handle single-digit days and months correctly', () => {
    const inputDate = '2023-1-5';
    const expectedOutput = '5.1.2023';

    const result = convertDateToDotFormat(inputDate);

    expect(result).toBe(expectedOutput);
  });

  it('should return empty string if input date is an empty string', () => {
    const inputDate = '';
    const expectedOutput = '';

    const result = convertDateToDotFormat(inputDate);

    expect(result).toBe(expectedOutput);
  });
});
