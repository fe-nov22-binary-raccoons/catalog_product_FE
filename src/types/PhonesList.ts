import { Phone } from './Phone';

export interface PhonesList {
  products: Phone[];
  total: number;
  page: number;
  size: number;
}
