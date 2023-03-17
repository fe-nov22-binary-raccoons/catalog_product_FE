import { Phone } from '../types/Phone';
import { client } from './fetchClient';

export const getPhones = (page = 1, size = 16) => {
  return client.get<Phone[]>(`phones?page=${page}&size=${size}`);
};
