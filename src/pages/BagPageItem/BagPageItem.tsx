import './BagPageItem.scss';
import React from 'react';

type Props = {
  counter: number[];
};

export const BagPageItem: React.FC<Props> = ({ counter }) => {
  return (
    <div className="item">
      <div className="item__conteiner-up">
        <div className="item__icon"></div>

        <div className="item__photo"></div>

        <div className="item__title">
          Apple iPhone 14 Pro 128GB Silver (MQ023)
        </div>
      </div>

      <div className="item__count-conteinter ">
        <div className="item__buttons">
          <div className="item__conteiner">
            <div className="icon--remove item--icon"></div>
          </div>

          <div>{counter[0]}</div>

          <div className="item__conteiner">
            <div className="icon--add icon"></div>
          </div>
        </div>

        <div className="item__price">$ 777</div>
      </div>
    </div>
  );
};
