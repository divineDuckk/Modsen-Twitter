import { checkFileFormat } from '@/utils/functions/checkFileFormat';

describe('checkFileFormat', () => {
  it('should return true if the file extension is accepted', () => {
    const name = 'example.jpg';
    const acceptExtensions = '.jpg,.png,.jpeg';

    const result = checkFileFormat(name, acceptExtensions);

    expect(result).toBe(true);
  });

  it('should return false if the file extension is not accepted', () => {
    const name = 'example.gif';
    const acceptExtensions = '.jpg,.png,.jpeg';

    const result = checkFileFormat(name, acceptExtensions);

    expect(result).toBe(false);
  });

  it('should return false if the file does not have an extension', () => {
    const name = 'example';
    const acceptExtensions = '.jpg,.png,.jpeg';

    const result = checkFileFormat(name, acceptExtensions);

    expect(result).toBe(false);
  });

  it('should return false if the file has an invalid extension', () => {
    const name = 'example.invalidext';
    const acceptExtensions = '.jpg,.png,.jpeg';

    const result = checkFileFormat(name, acceptExtensions);

    expect(result).toBe(false);
  });
});
