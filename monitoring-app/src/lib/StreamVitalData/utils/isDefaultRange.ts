export const isDefaultRange = (
  currentValue: number,
  streamingValue: number,
  range: number
): boolean => {
  return
};

export const isOverflowing = (streamingValue: number, range: number): boolean => {
  return streamingValue >= range;
}

export const isUnderflowing = (streamingValue: number, range: number): boolean => {
  return streamingValue <= range;
}
