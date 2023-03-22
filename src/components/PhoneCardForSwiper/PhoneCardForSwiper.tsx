import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import { ThemeContext } from '../ThemeProvider';

import {
  ReactComponent as HeartIcon,
} from '../../icons/buttons/add-to-favorite/favorite-btn.svg';
import {
  ReactComponent as HeartIconActive,
} from '../../icons/buttons/add-to-favorite/favorite-btn-active.svg';
import './PhoneCardForSwiper.scss';
import { FavoritesContext } from '../FavoritesContext';

type Props = {
  phone: Phone;
};

export const PhoneCardForSwiper: React.FC<Props> = ({ phone }) => {
  const { id, phoneId, image, name, price, fullPrice, screen, capacity, ram }
    = phone;

  const { iconColor } = useContext(ThemeContext);

  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useContext(FavoritesContext);

  const isFavoriteProduct = isFavorite(id);

  const handleFavorite = () => {
    if (isFavoriteProduct) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="phone-card-swiper">
      <Link className="phone-card-swiper_image-link" to={`/phones/${phoneId}`} onClick={scrollToTop}>
        <img className="phone-card-swiper_image" src={image} alt={name} />
      </Link>
      <Link className="phone-card-swiper_title" to={`/phones/${phoneId}`} onClick={scrollToTop}>
        {name}
      </Link>
      <div className="phone-card-swiper_price">
        <p className="phone-card-swiper_current-price">${price}</p>
        <p className="phone-card-swiper_old-price">${fullPrice}</p>
      </div>
      <div className="phone-card-swiper_descriptions">
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
        <button className="buttons_buy-btn">Add to card</button>
        <button
          className="buttons_favorites-btn"
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
