import { CategoryList } from '../types/CategoryList';
import { client } from './fetchClient';

export const getCategories = () => {
  return client.get<CategoryList>(
    'products/categories');
};

