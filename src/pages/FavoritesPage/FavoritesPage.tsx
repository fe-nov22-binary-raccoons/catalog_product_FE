import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../../api/fetchProducts';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { ProductsList } from '../../components/ProductsList';
import { Phone } from '../../types/Phone';
import './FavoritesPage.scss';

export const FavoritesPage: React.FC = () => {
  const [products, setProducts] = useState<Phone[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productsNum, setProductsNum] = useState<number>(0);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  // const pageSize = searchParams.get('size') || '16';
  const pageSize = '5';

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const productsFromServer = await getProducts(
        'phones',
        +currentPage,
        +pageSize,
      );

      setProducts(productsFromServer.products);
      setProductsNum(productsFromServer.total);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [pageSize, currentPage]);

  return (
    <div className="products">
      <div className="container">
        <BreadCrumbs />

        <div className="row">
          <div className="col-20">
            <h1 className="heading-1">Favorites Page</h1>
            <p className="subtitle">{productsNum} models</p>
          </div>

          {!!products.length && (
            <div
              className="col-xl-4 col-lg-4 col-md-24 col-sm-24 align-self-end"
            >
              <button className="buttons_buy-btn delete-all">Delete all</button>
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
