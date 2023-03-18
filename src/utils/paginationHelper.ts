export const getNumbers = (
  current: number,
  max: number,
  amount: number,
): number[] => {
  const numbers = [];

  let from = 1;
  const to = max;

  if (current > 2) {
    from = current - 1;
  }

  if (current >= max - 2 && max > amount) {
    from = current - (3 - (max - current));
  }

  for (let n = from; n <= to && n < from + amount; n += 1) {
    numbers.push(n);
  }

  return numbers;
};
