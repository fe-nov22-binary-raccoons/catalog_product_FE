import React from 'react';
import { Phone } from '../../types/Phone';
import './PhoneCard.scss';

type Props = {
  phone: Phone
};

export const PhoneCard: React.FC<Props> = ({ phone }) => {
  const {
    image,
    name,
    price,
    fullPrice,
    screen,
    capacity,
    ram,
  } = phone;

  return (
    <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
      <div className="phone-card" >
        <img className="phone_image" src={image} alt="" />
        <p className="phone-card_title">{name}</p>
        <div className="phone-card_price">
          <p className="current-price">${price}</p>
          <p className="old-price">${fullPrice}</p>
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
        <div className="phone-card_buttons">
          <button className="buy-btn">Add to card</button>
          <a href="#" className="favorites-btn">
            <p className="add-to-fav"></p>
          </a>
        </div>
      </div>
    </div>
  );
};
