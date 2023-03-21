import './BagPage.scss';
import React from 'react';
import { BagPageItem } from '../BagPageItem';

export const BagPage: React.FC = () => {
  const cost = 2657;
  const counter = [1, 7, 8];

  return (
    <div className="bag container">
      <div className="row">
        <h1 className="heading-1 col-24">Cart</h1>
      </div>

      <div className="bag__container row">
        <div className="bag__item-list col-xl-16 col-lg-24 col-md-24 col-sm-24">
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
          <BagPageItem counter={counter} />
        </div>

        <div className="col-xl-8 col-lg-24 col-md-24 col-sm-24">
          <div className="bag__item-cost">
            <div className="bag__cost">
              <h3 className="bag__cost-total">$ {cost}</h3>
              <h3 className="bag__count-items">
                {counter.length === 1
                  ? `Total for ${counter.length} item`
                  : `Total for ${counter.length} items`}
              </h3>
            </div>

            <button type="submit" className="submit__button">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
