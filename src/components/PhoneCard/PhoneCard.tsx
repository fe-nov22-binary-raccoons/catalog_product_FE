import React, { useCallback, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';

import {
  ReactComponent as HeartIcon,
} from '../../icons/buttons/add-to-favorite/favorite-btn.svg';
import {
  ReactComponent as HeartIconActive,
} from '../../icons/buttons/add-to-favorite/favorite-btn-active.svg';
import './PhoneCard.scss';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

type Props = {
  phone: Phone;
};

export const PhoneCard: React.FC<Props> = ({ phone }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { iconColor } = useContext(ThemeContext);
  const { phoneId, image, name, price, fullPrice, screen, capacity, ram }
    = phone;

  const handleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  return (
    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
      <div className="phone-card">
        <Link className="phone-card_image-link" to={`${phoneId}`}>
          <img className="phone-card_image" src={image} alt={name} />
        </Link>
        <Link className="phone-card_title" to={`${phoneId}`}>
          {name}
        </Link>
        <div className="phone-card_price">
          <p className="phone-card_current-price">${price}</p>
          <p className="phone-card_old-price">${fullPrice}</p>
        </div>
        <div className="phone-card_descriptions">
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
          {/* <a href="#" className="buttons_favorites-btn"></a> */}
          <button className="buttons_favorites-btn" onClick={handleFavorite}>
            {!isFavorite ? (
              <HeartIcon fill={iconColor} />
            ) : (
              <HeartIconActive fill="#476df4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
