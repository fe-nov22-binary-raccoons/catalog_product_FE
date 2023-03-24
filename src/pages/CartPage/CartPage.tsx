import './CartPage.scss';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { CartPageItem } from '../CartPageItem';
import { ModalAuth } from '../../components/ModalAuth';
import { CartContext } from '../../components/CartProvider';
import { getItem } from '../../api/fetchProducts';
import { Loader } from '../../components/Loader';
import { BackToPrevPage } from '../../components/BackToPrevPage';
import { checkoutReq } from '../../api/fetchCart';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorMessages } from '../../types/ErrorMessages';
import { PhoneItem } from '../../types/PhoneItem';
import { toast } from 'react-toastify';

export const CartPage: React.FC = () => {
  const { getCount, cartItems, cleanCart } = useContext(CartContext);
  const [phones, setPhones] = useState<PhoneItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = React.useState(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await Promise.all(
        cartItems.map(item => getItem(item.id)),
      );

      setPhones(fetchedProducts);
      setIsLoading(false);
    };

    fetchData();
  }, [cartItems]);

  const totalCost = phones.reduce(
    (total, phone) => total + phone.priceDiscount * getCount(phone.id), 0,
  );

  const totalItems = cartItems.reduce(
    (total, cart) => total + cart.count, 0,
  );

  const checkout = async () => {
    const accessToken = window.localStorage.getItem('accessToken');

    if (!accessToken) {
      setModalShow(true);

      return;
    }

    try {
      setIsLoading(true);
      setIsError(false);

      await checkoutReq({ cart: cartItems, accessToken });
      window.localStorage.removeItem('cart');
      cleanCart();
      setPhones([]);
      toast.success('Your order is processing!', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        autoClose: 4000,
      });

    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  const showCartContent = !!phones.length && !isError && !isLoading;
  const showError = !phones.length && !isLoading;


  return (
    <div className="bag container">
      <div className="row">
        <div className="bag__prev-btn col-24">
          <BackToPrevPage />
        </div>
      </div>
      <div className="row">
        <h1 className="heading-1 col-24">Cart</h1>
      </div>

      {isLoading && <Loader />}

      {showError && <ErrorMessage text={ErrorMessages.OnEmptyCart} />}

      {showCartContent && (
        <div className="bag__container row">
          <div
            className="bag__item-list col-xl-16 col-lg-24 col-md-24 col-sm-24"
          >

            {phones.map(item => (
              <Fragment key={item.id}>
                <CartPageItem
                  item={item}
                />
              </Fragment>
            ))}
          </div>

          <div className="col-xl-8 col-lg-24 col-md-24 col-sm-24">
            <div className="bag__item-cost">
              <div className="bag__cost">
                <h3 className="bag__cost-total">$ {totalCost}</h3>
                <h3 className="bag__count-items">
                  {totalItems === 1
                    ? `Total for ${totalItems} item`
                    : `Total for ${totalItems} items`}
                </h3>
              </div>

              <button type="submit" className="submit__button"
                onClick={() => checkout()}
              >
                Checkout
              </button>
            </div>

            <ModalAuth
              show={modalShow}
              onHide={() => setModalShow(false)}
            />

          </div>

          <ModalAuth
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

        </div>
      )}

    </div>
  );
};
