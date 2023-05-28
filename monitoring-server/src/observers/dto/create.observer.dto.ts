import { RegionsValues } from '../../common';

export class CreateObserverDto {
  readonly email: string;
  readonly password: string;
  readonly region: RegionsValues;
}