import { PhoneItem } from '../types/PhoneItem';
import { PhonesList } from '../types/PhonesList';
import { client } from './fetchClient';

export const getPhones = (page = 1, size = 16, sortBy = 'age') => {
  return client.get<PhonesList>(
    `phones?page=${page}&size=${size}&sort=${sortBy}`,
  );
};

export const getItem = (id: string) => {
  return client.get<PhoneItem>(`phones/${id}`);
};
