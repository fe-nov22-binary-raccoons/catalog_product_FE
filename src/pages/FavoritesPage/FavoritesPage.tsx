import { useContext, useEffect, useState } from 'react';
// import { useSearchParams } from 'react-router-dom';
import { getPhone } from '../../api/fetchProducts';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { FavoritesContext } from '../../components/FavoritesContext';
import { ProductsList } from '../../components/ProductsList';
import { Phone } from '../../types/Phone';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [productsNum, setProductsNum] = useState<number>(0);

  // const [searchParams] = useSearchParams();
  // const currentPage = searchParams.get('page') || '1';
  // const pageSize = searchParams.get('size') || '16';
  // const pageSize = '5';

  const { favorites, removeAllFavorites } = useContext(FavoritesContext);

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const favoritesPhones = await Promise.all(
        favorites.map(id => getPhone(id)),
      );

      setProducts(favoritesPhones);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [favorites]);

  const handleDelete = () => removeAllFavorites();

  return (
    <div className="products">
      <div className="container">
        <BreadCrumbs />

        <div className="row">
          <div className="col-20">
            <h1 className="heading-1">Favorites Page</h1>
            {products.length > 0 && (
              <p className="subtitle">{products.length} models</p>
            )}
          </div>

          {!!products.length && (
            <div
              className="col-xl-4 col-lg-4 col-md-6 col-sm-24 align-self-end"
            >
              <button
                onClick={handleDelete}
                className="buttons_buy-btn delete-all"
              >
                Delete all
              </button>
            </div>
          )}
        </div>
      </div>

      <ProductsList
        products={products}
        isError={isError}
        isLoading={isLoading}
      />
    </div>
  );
};
