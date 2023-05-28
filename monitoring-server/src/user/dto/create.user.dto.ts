import { RegionsValues } from '../../common';

export class CreateUserDto {
  readonly email: string;
  readonly fullName: string;
  readonly badgeNumber: string;
  readonly brigadeNumber: string;
  readonly password: string;
  readonly region: RegionsValues;
}
