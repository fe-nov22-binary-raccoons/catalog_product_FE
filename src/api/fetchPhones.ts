import { PhoneItem } from '../types/PhoneItem';
import { PhonesList } from '../types/PhonesList';
import { client } from './fetchClient';

export const getPhones = (page = 1, size = 16) => {
  return client.get<PhonesList>(`phones?page=${page}&size=${size}`);
};

export const getItem = (id: string) => {
  return client.get<PhoneItem>(`phones/${id}`);
};
