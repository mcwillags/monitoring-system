import { REGIONS } from '../constants';

export const isValidRegion = (region: string) => {
  return Object.values(REGIONS).includes(region);
};