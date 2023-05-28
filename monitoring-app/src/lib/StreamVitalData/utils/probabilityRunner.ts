export const probabilityRunner =(
  probability: number,
  successCallback: (...args: any[]) => any,
  failureCallback: (...args: any[]) => any
) => {
  const randomNumber = Math.random() * 100;

  if (randomNumber < probability) return successCallback();
  else return failureCallback();
};
