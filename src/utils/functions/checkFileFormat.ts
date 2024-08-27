export const checkFileFormat = (name: string, acceptExtensions: string) => {
  const extension = name.substring(name.indexOf('.'));
  return acceptExtensions.includes(extension);
};
