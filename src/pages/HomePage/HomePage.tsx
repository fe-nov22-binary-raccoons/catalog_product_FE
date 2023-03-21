import { CategoryCard } from '../../components/CategoryCard';
import { BannerSwiper } from '../../components/BannerSwiper';
import './HomePage.scss';
import { ProductSwiper } from '../../components/ProductSwiper';
import { getCategories } from '../../api/fetchCategory';
import { useEffect, useState } from 'react';
import { Category } from '../../types/Category';
import { Loader } from '../../components/Loader';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorMessages } from '../../types/ErrorMessages';

export const HomePage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadCategories = async () => {
    try {
      const categoriesFromServer = await getCategories();

      setCategories(categoriesFromServer.categories);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <>
      <div className="home-page container">
        <div className="row">
          <div className="col-24 ">
            <div className="home-page__title">
              <h1 className="heading-1">Welcome to Nice Gadgets store!</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="banner-swiper-block">
        <BannerSwiper />
      </div>
      <div className="new-products-block">
        <ProductSwiper endPoint="products/new" title="Brand new models" />
      </div>
      <section className="home-page_categories container">
        <div className="row">
          <h2 className="col-24 heading-2">Shop be category</h2>
        </div>
        <div className="row">
          {isLoading && <Loader />}

          {isError && <ErrorMessage text={ErrorMessages.OnLoad} />}

          {!!categories && (
            categories.map((category) => (
              <CategoryCard
                name={category.name}
                itemsCount={category.itemsCount}
                img={category.img}
                path={category.path}
                backgroundColor={category.backgroundColor}
                key={category.id}
              />
            ))
          )}
        </div>
      </section>
      <div className="discount-products-block">
        <ProductSwiper endPoint="products/discount" title="Hot prices" />
      </div>
    </>
  );
};
