import { ErrorMessages } from '../../types/ErrorMessages';
import { Phone } from '../../types/Phone';
import { ErrorMessage } from '../ErrorMessage';
import { Loader } from '../Loader';
import { ProductCard } from '../ProductCard';
import './ProductsList.scss';

type Props = {
  products: Phone[];
  isError: boolean;
  isLoading: boolean;
};

export const ProductsList: React.FC<Props> = ({
  products,
  isError,
  isLoading,
}) => {
  const showNoProducts = !products.length && !isError && !isLoading;
  const showProductsCards = !!products.length && !isLoading;

  return (
    <div className="container products-list">
      <div className="row gy-4">
        {showProductsCards
          && products.map((pr) => <ProductCard product={pr} key={pr.id} />)}

        {isLoading && <Loader />}

        {!products.length && isError && (
          <ErrorMessage text={ErrorMessages.OnLoad} />
        )}

        {showNoProducts && <ErrorMessage text={ErrorMessages.OnEmptyData} />}
      </div>
    </div>
  );
};
