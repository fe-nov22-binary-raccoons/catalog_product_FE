import React, { useEffect, useState } from 'react';
import '../page-grid.scss';
import './PhonesPage.scss';
import { BreadCrumbs } from '../../components/BreadCrumbs';
import { Sorting } from '../../components/Sorting';
import { Pagination } from '../../components/Pagination';
import { ProductsList } from '../../components/ProductsList';
import { getProducts } from '../../api/fetchProducts';
import { Phone } from '../../types/Phone';
import { SortBy } from '../../types/SortBy';
import { useSearchParams } from 'react-router-dom';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [productsNum, setProductsNum] = useState<number>(0);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const pageSize = searchParams.get('size') || '16';
  const sortBy = searchParams.get('sort') || SortBy.Newest;

  const loadProducts = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const productsFromServer = await getProducts(
        'phones',
        +currentPage,
        +pageSize,
        sortBy,
      );

      setPhones(productsFromServer.products);
      setProductsNum(productsFromServer.total);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [pageSize, currentPage, sortBy]);

  const showPagination
    = !isLoading && !isError && !!phones.length && +pageSize !== productsNum;

  return (
    <div className="products">
      <div className="container">
        <BreadCrumbs />

        <div className="row">
          <div className="col-24">
            <h1 className="heading-1">Mobile phones</h1>
            <p className="subtitle">{productsNum} models</p>
          </div>
        </div>

        <Sorting total={productsNum} />
      </div>

      <ProductsList products={phones} isError={isError} isLoading={isLoading} />

      {showPagination && (
        <Pagination total={productsNum} pageSize={+pageSize} />
      )}
    </div>
  );
};
