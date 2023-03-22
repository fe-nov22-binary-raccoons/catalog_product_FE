import './CartPage.scss';
import React, { useContext, useEffect, useState } from 'react';
import { CartPageItem } from '../CartPageItem';
import { CartContext } from '../../components/CartProvider';
import { Phone } from '../../types/Phone';
import { getPhone } from '../../api/fetchProducts';
import { Loader } from '../../components/Loader';

export const CartPage: React.FC = () => {
  const { getCount, cartItems } = useContext(CartContext);
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await Promise.all(
        cartItems.map(item => getPhone(item.id)),
      );

      setPhones(fetchedProducts);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const totalCost = phones.reduce(
    (total, product) => total + product.price * getCount(product.id), 0,
  );


  return (
    <div className="bag container">
      <div className="row">
        <h1 className="heading-1 col-24">Cart</h1>
      </div>

      <div className="bag__container row">
        <div className="bag__item-list col-xl-16 col-lg-24 col-md-24 col-sm-24">
          {isLoading
            ? <Loader />
            : (!!phones.length
              && phones.map(item => (
                <CartPageItem
                  key={item.id}
                  item={item}
                  // count={getCount(item.id)}
                />
              ))
            )}
        </div>

        <div className="col-xl-8 col-lg-24 col-md-24 col-sm-24">
          <div className="bag__item-cost">
            <div className="bag__cost">
              <h3 className="bag__cost-total">$ {totalCost}</h3>
              <h3 className="bag__count-items">
                {cartItems.length === 1
                  ? `Total for ${cartItems.length} item`
                  : `Total for ${cartItems.length} items`}
              </h3>
            </div>

            <button type="submit" className="submit__button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
