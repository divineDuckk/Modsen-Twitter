export const getYearsArray = () => {
  const currentYear = new Date().getFullYear();
  const yearsArray = Array.from(
    { length: currentYear - 1950 + 1 },
    (_, index) => 1950 + index,
  );
  return yearsArray;
};
