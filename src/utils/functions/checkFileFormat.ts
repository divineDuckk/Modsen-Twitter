import { fileTypeFromBuffer } from 'file-type';

export const checkFileFormat = async (file: File, acceptExtensions: string) => {
  const buffer = await file.arrayBuffer();
  const uint8Array = new Uint8Array(buffer);
  const fileType = await fileTypeFromBuffer(uint8Array);

  if (!fileType) return false;

  const { ext } = fileType;

  const normalizedAcceptExtensions = acceptExtensions
    .split(',')
    .map((ext) => ext.trim().replace('.', ''));

  return normalizedAcceptExtensions.includes(ext);
};
