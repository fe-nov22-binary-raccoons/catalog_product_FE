import { createContext } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';

// type ProductFavorites = {
//   id?: number,
//   phoneId: string,
// };

interface ContextType {
  favorites: number[],
  addFavorite: (productId: number) => void,
  removeFavorite: (productId: number) => void,
  isFavorite: (productId: number) => boolean,
  removeAllFavorites: () => void,
}

const defaultContext: ContextType = {
  favorites: [],
  addFavorite: () => {},
  removeFavorite: () => {},
  isFavorite: () => false,
  removeAllFavorites: () => {},
};

export const FavoritesContext = createContext(defaultContext);

interface Props {
  children: React.ReactNode,
}

export const FavoritesProvider: React.FC<Props> = ({ children }) => {
  const [
    favorites,
    setFavorites] = useLocalStorage<number[]>('favorites', []);

  const addFavorite = (productId: number) => {
    setFavorites(current => [...current, productId]);
  };

  const removeFavorite = (productId: number): void => {
    setFavorites(current => (
      current.filter(id => id !== productId)
    ));
  };

  const isFavorite = (productId: number): boolean => (
    favorites.includes(productId)
  );

  const removeAllFavorites = () => {
    setFavorites(() => []);
  };

  const contextValue = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    removeAllFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};
