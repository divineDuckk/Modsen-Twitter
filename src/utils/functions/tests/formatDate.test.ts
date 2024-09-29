import { formatDate } from '@/utils/functions/formatDate';

describe('formatDate', () => {
  it('should format a date correctly', () => {
    const testDate = new Date('2023-09-01T12:30:45');
    const expectedOutput = '1 Sep 2023 12:30:45';

    const result = formatDate(testDate);

    expect(result).toBe(expectedOutput);
  });

  it('should correctly format single-digit day and month', () => {
    const testDate = new Date('2023-01-05T09:05:03');
    const expectedOutput = '5 Jan 2023 09:05:03';

    const result = formatDate(testDate);

    expect(result).toBe(expectedOutput);
  });

  it('should correctly handle dates in the future', () => {
    const testDate = new Date('2050-11-02T23:59:59');
    const expectedOutput = '2 Nov 2050 23:59:59';

    const result = formatDate(testDate);

    expect(result).toBe(expectedOutput);
  });
});
