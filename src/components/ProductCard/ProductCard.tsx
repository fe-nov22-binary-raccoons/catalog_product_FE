import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import './ProductCard.scss';

import {
  ReactComponent as HeartIcon,
} from '../../icons/buttons/add-to-favorite/favorite-btn.svg';
import { ThemeContext } from '../ThemeProvider';

type Props = {
  product: Phone;
};

export const ProductCard: React.FC<Props> = ({ product }) => {
  const { phoneId, image, name, price, fullPrice, screen, capacity, ram }
    = product;

  const { iconColor } = useContext(ThemeContext);

  return (
    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
      <div className="product-card">
        <Link className="product-card_image-link" to={`${phoneId}`}>
          <img className="product-card_image" src={image} alt={name} />
        </Link>
        <Link className="product-card_title" to={`${phoneId}`}>
          {name}
        </Link>
        <div className="product-card_price">
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
          <button className="buttons_buy-btn">Add to card</button>
          <a href="#" className="buttons_favorites-btn">
            <HeartIcon fill={iconColor} />
          </a>
        </div>
      </div>
    </div>
  );
};
