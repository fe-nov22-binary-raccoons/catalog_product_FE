import './CartPageItem.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../components/CartProvider';
import { Phone } from '../../types/Phone';

import { ReactComponent as Close } from '../../images/header/close_icon.svg';
import { ReactComponent as Plus } from '../../images/header/icon_plus.svg';
import { ReactComponent as Minus } from '../../images/header/icon_minus.svg';
import { ThemeContext } from '../../components/ThemeProvider';

type Props = {
  item: Phone,
  // count: number,
};

export const CartPageItem: React.FC<Props> = ({ item }) => {
  const { add, remove, subtract, getCount } = useContext(CartContext);
  const { iconColor } = useContext(ThemeContext);

  const isSubtractDisabled = getCount(item.id) === 1;
  const isAddDisabled =  getCount(item.id) > 9;

  return (
    <div className="item">
      <div className="item__container-up">
        <button onClick={() => remove(item.id)}>
          <Close fill={iconColor} />
        </button>

        <div className="item__photo"></div>

        <div className="item__title">
          {item.name}
        </div>
      </div>

      <div className="item__amount-container ">
        <div className="item__amount-buttons">
          <div className="item__amount-icon">
            <button
              onClick={() => subtract(item.id)}
              disabled={isSubtractDisabled}
            >
              <Minus fill={iconColor} />
            </button>
          </div>

          <div className="item__amount-number">{getCount(item.id)}</div>

          <div className="item__amount-icon">
            <button
              onClick={() => add(item.id)}
              disabled={isAddDisabled}
            >
              <Plus fill={iconColor} />
            </button>
          </div>
        </div>

        <div className="item__price">$ {item.price}</div>
      </div>
    </div>
  );
};
