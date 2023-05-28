import {axios, createToastError} from './index';


type AvailableRegions = Record<string, string>;

export const requestAvailableRegions = async (): Promise<string[] | undefined> => {
  try {
    const { data } = await axios.get<AvailableRegions>('data/available-regions');

    return Object.values(data);

  } catch (e) {
    createToastError("There is error during receiving available regions");
  }
};