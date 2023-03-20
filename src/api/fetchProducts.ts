import { PhoneItem } from '../types/PhoneItem';
import { PhonesList } from '../types/PhonesList';
import { client } from './fetchClient';

export const getProducts = (
  productType: string,
  page = 1,
  size = 16,
  sortBy = 'age',
) => {
  return client.get<PhonesList>(
    `products?page=${page}&size=${size}&sortBy=${sortBy}&productType=${productType}`,
  );
};

export const getItem = (id: string) => {
  return client.get<PhoneItem>(`products/${id}`);
};
