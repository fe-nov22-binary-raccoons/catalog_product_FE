import { createContext } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';

type CartItem = {
  id: string,
  count: number,
};

type ContextType = {
  cartItems: CartItem[],
  getCount: (itemId: string) => number;
  add: (itemId: string) => void,
  subtract: (itemId: string) => void,
  remove: (itemId: string) => void,
  isAdded: (itemId: string) => boolean,
};

interface Props {
  children: React.ReactNode;
}

export const CartContext = createContext<ContextType>({
  cartItems: [],
  getCount: () => 0,
  add: () => {},
  subtract: () => {},
  remove: () => { },
  isAdded: () => false,
});

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart', []);

  const add = (itemId: string) => {
    const cart = cartItems.find(({ id }) => itemId === id);

    if (!cart) {
      const newCart = { id: itemId, count: 1 };

      setCartItems((currentItems) => [...currentItems, newCart]);

      return;
    }

    cart.count++;

    setCartItems([...cartItems]);
  };

  const subtract = (itemId: string) => {
    const cart = cartItems.find(({ id }) => itemId === id);

    if (!cart) {
      return setCartItems([...cartItems]);
    }

    cart.count--;

    if (cart.count <= 0) {
      return setCartItems(
        (currentItems) => currentItems.filter(({ id }) => id !== itemId),
      );
    }

    setCartItems([...cartItems]);
  };

  const remove = (itemId: string) => {
    return setCartItems(
      (currentItems) => currentItems.filter(({ id }) => id !== itemId),
    );
  };

  const getCount = (itemId: string) => {
    return cartItems.find(item => item.id === itemId)?.count ?? 0;
  };

  const isAdded = (productId: string): boolean => (
    cartItems.some(({ id }) => id === productId)
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        add,
        subtract,
        remove,
        getCount,
        isAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
