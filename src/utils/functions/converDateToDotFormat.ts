export const convertDateToDotFormat = (date: string) => {
  return date?.split('-').reverse().join('-').replace(/-/g, '.');
};
