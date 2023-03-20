import { CategoryCard } from '../../components/CategoryCard';
import { BannerSwiper } from '../../components/BannerSwiper';
import './HomePage.scss';

export const HomePage = () => {
  const categories = [
    {
      id: 1,
      name: 'Mobile phones',
      itemsCount: 94,
      img: 'https://i.ibb.co/9tRcHMV/category-phones.png',
      path: 'phones',
    },
    {
      id: 2,
      name: 'Tablets',
      itemsCount: 54,
      img: 'https://i.ibb.co/ZfxmNQ4/category-tablets.png',
      path: 'tablets',
    },
    {
      id: 3,
      name: 'Accessories',
      itemsCount: 104,
      img: 'https://i.ibb.co/cCqB3t2/category-accessories.png',
      path: 'accessories',
    },
  ];

  return (
    <div className="home-page container">
      <div className="row">
        <div className="col-24">
          <h1 className="heading-1 margin-top-50">
            Welcome to Nice Gadgets store!
          </h1>
        </div>
      </div>
      <div className="row margin-bot-30"></div>
      <BannerSwiper />
      <section className="home-page_categories">
        {/* <div className="container"> */}
        <div className="row">
          <h2 className="col-24 heading-2">Shop be category</h2>
        </div>
        <div className="row">
          {categories.map((category) => (
            <CategoryCard
              name={category.name}
              itemsCount={category.itemsCount}
              img={category.img}
              path={category.path}
              key={category.id}
            />
          ))}
        </div>
        {/* </div> */}
      </section>
    </div>
  );
};
