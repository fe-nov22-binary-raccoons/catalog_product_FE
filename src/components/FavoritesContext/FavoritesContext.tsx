import { createContext } from 'react';
import { useLocalStorage } from '../../utils/useLocalStorage';

interface ContextType {
  favorites: string[],
  addFavorite: (productId: string) => void,
  removeFavorite: (productId: string) => void,
  isFavorite: (productId: string) => boolean,
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
    setFavorites] = useLocalStorage<string[]>('favorites', []);

  const addFavorite = (productId: string) => {
    setFavorites(current => [...current, productId]);
  };

  const removeFavorite = (productId: string): void => {
    setFavorites(current => (
      current.filter(id => id !== productId)
    ));
  };

  const isFavorite = (productId: string): boolean => (
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
