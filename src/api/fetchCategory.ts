import { Category } from '../types/Category';
import { client } from './fetchClient';

export const getCategories = () => {
  return client.get<Category[]>(
    'products/categories');
};

