import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from '../../types/Phone';
import './PhoneCard.scss';

type Props = {
  phone: Phone;
};

export const PhoneCard: React.FC<Props> = ({ phone }) => {
  const { phoneId, image, name, price, fullPrice, screen, capacity, ram }
    = phone;

  return (
    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
      <div className="phone-card">
        <Link className="phone-card_image-link" to={`../phones/${phoneId}`}>
          <img className="phone-card_image" src={image} alt={name} />
        </Link>
        <Link className="phone-card_title" to={`../phones/${phoneId}`}>
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
          <a href="#" className="buttons_favorites-btn"></a>
        </div>
      </div>
    </div>
  );
};
