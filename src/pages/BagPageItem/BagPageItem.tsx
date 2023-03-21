import './BagPageItem.scss';
import React from 'react';

type Props = {
  counter: number[];
};

export const BagPageItem: React.FC<Props> = ({ counter }) => {
  return (
    <div className="item">
      <div className="item__container-up">
        <div className="item__icon"></div>

        <div className="item__photo"></div>

        <div className="item__title">
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </div>
      </div>

      <div className="item__amount-container ">
        <div className="item__amount-buttons">
          <div className="item__amount-icon">
            <div className="icon__button icon__button-remove"></div>
          </div>

          <div className="item__amount-number">{counter[0]}</div>

          <div className="item__amount-icon">
            <div className="icon__button icon__button-add"></div>
          </div>
        </div>

        <div className="item__price">$ 777</div>
      </div>
    </div>
  );
};
