import { REGION_NUMBERS } from '../';
import { hashString } from './hashString';

export const generateConnectionCode = ({ region, brigadeNumber }) => {
  const isRegionNumber = REGION_NUMBERS[region] !== undefined;

  if (!isRegionNumber) return null;

  return `${REGION_NUMBERS[region]}/${hashString(brigadeNumber)}`;
};
