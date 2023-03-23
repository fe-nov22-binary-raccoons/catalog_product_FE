import { CartItem } from '../types/CartItem';
import { client } from './fetchClient';

export const checkoutReq = ( data: CartItem[]) => {
  return client.patch(
    'cart', data,
  );
};
