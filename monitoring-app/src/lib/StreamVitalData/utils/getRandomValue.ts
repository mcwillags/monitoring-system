export const getRandomValue = (value: number[], isDecimal?: boolean): number => {
  if (!value.length) return Math.random();

  if (value.length === 1) {
    return Math.floor(Math.random() * value[0]);
  }

  const [min, max] = value;

  const randomValue = Math.random() * (max - min) + min;

  if (isDecimal) return Math.trunc(randomValue * 10) / 10;

  return Math.floor(randomValue);
};
