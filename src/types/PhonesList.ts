import { Phone } from './Phone';

export interface PhonesList {
  phones: Phone[];
  total: number;
  page: number;
  size: number;
}
