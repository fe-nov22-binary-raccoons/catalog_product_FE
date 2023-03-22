import React, { useCallback, useContext, useState } from 'react';
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
import './PhoneCardForSwiper.scss';
import { CartContext } from '../CartProvider';

type Props = {
  phone: Phone;
};

export const PhoneCardForSwiper: React.FC<Props> = ({ phone }) => {
  const { phoneId, image, name, price, fullPrice, screen, capacity, ram, id }
    = phone;

  const [isFavorite, setIsFavorite] = useState(false);
  const { iconColor } = useContext(ThemeContext);
  const { add, isAdded, remove } = useContext(CartContext);

  const handleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  const handleClickAdded = () => {
    if (isAdded(id)) {
      remove(id);

      return;
    }

    add(id);
  };

  return (
    <div className="phone-card-swiper">
      <Link className="phone-card-swiper_image-link" to={`/phones/${phoneId}`}>
        <img className="phone-card-swiper_image" src={image} alt={name} />
      </Link>
      <Link className="phone-card-swiper_title" to={`/phones/${phoneId}`}>
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
        <button
          className={cn('buttons_buy-btn', {
            'buttons_buy-btn_isAdded': isAdded(id),
          })}
          onClick={handleClickAdded}
        >
          Add to
        </button>
        <button
          className="buttons_favorites-btn"
          onClick={handleFavorite}
        >
          {!isFavorite ? (
            <HeartIcon fill={iconColor} />
          ) : (
            <HeartIconActive fill="#476df4" />
          )}
        </button>
      </div>
    </div>
  );
};
