import { CartItem } from '../types/CartItem';
import { client } from './fetchClient';

type CheckoutBody = {
  cart: CartItem[],
  accessToken: string
};

export const checkoutReq = ( data: CheckoutBody) => {
  return client.patch(
    'cart', data,
  );
};
