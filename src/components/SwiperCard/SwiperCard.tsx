import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { ThemeContext } from '../ThemeProvider';
import cn from 'classnames';

import {
  ReactComponent as HeartIcon,
} from '../../icons/buttons/add-to-favorite/favorite-btn.svg';
import {
  ReactComponent as HeartIconActive,
} from '../../icons/buttons/add-to-favorite/favorite-btn-active.svg';
import './SwiperCard.scss';

import { CartContext } from '../CartProvider';

import { FavoritesContext } from '../FavoritesContext';
import { toast } from 'react-toastify';


type Props = {
  phone: Phone;
};

export const PhoneCardForSwiper: React.FC<Props> = ({ phone }) => {
  const {
    phoneId, image, name, price, fullPrice, screen, capacity, ram,
  } = phone;

  const { iconColor } = useContext(ThemeContext);
  const { add, isAdded, remove } = useContext(CartContext);

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const isFavoriteProduct = isFavorite(phoneId);

  const handleFavorite = () => {
    if (isFavoriteProduct) {
      removeFavorite(phoneId);
      toast.success('Removed from favorites', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        autoClose: 1000,
        pauseOnHover: false,
        icon: '❌',
      });
    } else {
      addFavorite(phoneId);
      toast.success('Added to favorites', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        autoClose: 1000,
        pauseOnHover: false,
        icon:'❤️',
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const handleClickAdded = () => {
    if (isAdded(phoneId)) {
      remove(phoneId);
      toast.success('Removed from cart', {
        hideProgressBar: true,
        theme: 'light',
        bodyClassName: 'toast-style',
        autoClose: 1000,
        pauseOnHover: false,
        icon: '❌',
      });

      return;
    }

    add(phoneId);
    toast.success('Added to cart', {
      hideProgressBar: true,
      theme: 'light',
      bodyClassName: 'toast-style',
      autoClose: 1000,
      pauseOnHover: false,
    });
  };

  return (
    <div className="product-card swiper-card">
      <Link className="product-card_image-link" to={`/phones/${phoneId}`} onClick={scrollToTop}>
        <img className="product-card_image" src={image} alt={name} />
      </Link>
      <Link className="product-card_title" to={`/phones/${phoneId}`} onClick={scrollToTop}>
        {name}
      </Link>
      <div className="product-card_price swiper-price">
        <p className="product-card_current-price">${price}</p>
        <p className="product-card_old-price">${fullPrice}</p>
      </div>
      <div className="product-card_descriptions">
        <div className="characteristic">
          <p className="characteristic-title">Screen</p>
          <p className="characteristic-value">{screen}</p>
        </div>
        <div className="characteristic">
          <p className="characteristic-title">Capacity</p>
          <p className="characteristic-value">{capacity}</p>
        </div>
        <div className="characteristic">
          <p className="characteristic-title">Ram</p>
          <p className="characteristic-value">{ram}</p>
        </div>
      </div>
      <div className="buttons">
        <button
          className={cn('button buy-btn', {
            'buy-btn_isAdded': isAdded(phoneId),
          })}
          onClick={handleClickAdded}
        >
          {isAdded(phoneId)
            ? 'Added to cart'
            : 'Add to cart'
          }
        </button>
        <button
          className="favorites-btn"
          onClick={handleFavorite}
        >
          {!isFavoriteProduct
            ? (<HeartIcon fill={iconColor} />)
            : (<HeartIconActive fill="#476df4" />)}
        </button>
      </div>
    </div>
  );
};
