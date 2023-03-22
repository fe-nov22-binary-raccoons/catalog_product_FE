import './CartPageItem.scss';
import React, { useContext } from 'react';
import { CartContext } from '../../components/CartProvider';
import { Phone } from '../../types/Phone';
import cn from 'classnames';

import { ReactComponent as Close } from '../../images/header/close_icon.svg';
import { ReactComponent as Plus } from '../../images/header/icon_plus.svg';
import { ReactComponent as Minus } from '../../images/header/icon_minus.svg';
import { ThemeContext } from '../../components/ThemeProvider';
import { Link } from 'react-router-dom';

type Props = {
  item: Phone,
};

export const CartPageItem: React.FC<Props> = ({ item }) => {
  const { add, remove, subtract, getCount } = useContext(CartContext);
  const { iconColor } = useContext(ThemeContext);

  const { id, name, image, price, phoneId } = item;

  const isSubtractDisabled = getCount(item.id) === 1;
  const isAddDisabled = getCount(item.id) > 9;

  return (
    <div className="item">
      <div className="item__container-up">
        <button
          onClick={() => remove(id)}
          className='item__remove-btn'
        >
          <Close fill={iconColor} />
        </button>

        <Link
          to={`/phones/${phoneId}`}
          className="item__photo-container"
        >
          <img
            src={image}
            alt={name}
            className='item__photo'
          />
        </Link>

        <div className="item__title">
          {name}
        </div>
      </div>

      <div className="item__amount-container ">
        <div className="item__amount-buttons">
          <div>
            <button
              onClick={() => subtract(id)}
              disabled={isSubtractDisabled}
              className={cn('item__amount-icon', {
                'isDisabled': isSubtractDisabled,
              })}
            >
              <Minus fill={iconColor} />
            </button>
          </div>

          <div className="item__amount-number">
            {getCount(id)}
          </div>

          <div>
            <button
              onClick={() => add(id)}
              disabled={isAddDisabled}
              className={cn('item__amount-icon', {
                'isDisabled': isAddDisabled,
              })}
            >
              <Plus fill={iconColor} />
            </button>
          </div>
        </div>

        <div className="item__price">$ {price}</div>
      </div>
    </div>
  );
};
