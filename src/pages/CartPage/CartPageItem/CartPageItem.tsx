import './CartPageItem.scss';
import React, { memo, useContext } from 'react';
import { CartContext } from '../../../components/CartProvider';
import cn from 'classnames';

import { ReactComponent as Close } from '../../../images/header/close_icon.svg';
import { ReactComponent as Plus } from '../../../images/header/icon_plus.svg';
import { ReactComponent as Minus } from '../../../images/header/icon_minus.svg';
import { ThemeContext } from '../../../components/ThemeProvider';
import { Link } from 'react-router-dom';
import { PhoneItem } from '../../../types/PhoneItem';

type Props = {
  item: PhoneItem,
};

export const CartPageItem: React.FC<Props> = memo(({ item }) => {
  const { add, remove, subtract, getCount } = useContext(CartContext);
  const { iconColor } = useContext(ThemeContext);

  const { id, name, images, priceDiscount } = item;

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
          to={`/phones/${id}`}
          className="item__photo-container"
        >
          <img
            src={images.find(img => img.includes('00'))}
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

        <div className="item__price">$ {priceDiscount}</div>
      </div>
    </div>
  );
});

CartPageItem.displayName = 'CartPageItem';
