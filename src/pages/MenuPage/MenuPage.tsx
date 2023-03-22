import './MenuPage.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { MenuNavLink } from './MenuNavLink/MenuNavLink';
import classNames from 'classnames';

import {
  ReactComponent as HeartIcon,
} from '../../images/header/heart_icon.svg';
import {
  ReactComponent as BagIcon,
} from '../../images/header/bag_icon.svg';
import { ReactComponent as Logo } from '../../images/header/logo.svg';
import { ReactComponent as Menu } from '../../images/header/menu_icon.svg';
import { ReactComponent as Close } from '../../images/header/close_icon.svg';

import { ThemeContext } from '../../components/ThemeProvider';

export const MenuPage: React.FC = () => {
  const [isMenuPage, setIsMenuPage] = useState(false);
  const { iconColor } = useContext(ThemeContext);
  const location = useLocation();

  useEffect(() => {
    if (isMenuPage) {
      document.body.classList.add('page__menu');
    } else {
      document.body.classList.remove('page__menu');
    }
  }, [isMenuPage]);

  return (
    <>
      <div className="menu__icon">
        <button
          onClick={() => setIsMenuPage(true)}
          type="button"
          className="menu__button-icon"
        >
          <Menu fill={iconColor} />
        </button>
      </div>

      {isMenuPage && (
        <div className="menu">
          <nav className="menu__nav">
            <div className="menu__header">
              <div className="menu__logo">
                <NavLink to="/home" className="menu__logo-image">
                  <Logo fill={iconColor} />
                </NavLink>
              </div>

              <button
                onClick={() => setIsMenuPage(false)}
                type="button"
                className="menu__button"
              >
                <Close fill={iconColor} />
              </button>
            </div>

            <div className="menu__list">
              <MenuNavLink
                to={'/'}
                title={'Home'}
                setIsMenuPage={setIsMenuPage}
              />

              <MenuNavLink
                to={'phones'}
                title={'Phones'}
                setIsMenuPage={setIsMenuPage}
              />

              <MenuNavLink
                to={'tablets'}
                title={'Tablets'}
                setIsMenuPage={setIsMenuPage}
              />

              <MenuNavLink
                to={'accessories'}
                title={'Accessories'}
                setIsMenuPage={setIsMenuPage}
              />
            </div>

            <div className="menu__buttons-container">
              <div
                className={classNames('menu__icon menu__icon-border', {
                  'icon-active': location.pathname.includes('favorites'),
                })}
              >
                <NavLink
                  to="favorites"
                  onClick={() => setIsMenuPage(false)}
                  className="icon__action icon__action-favorites"
                >
                  <HeartIcon fill={iconColor} />
                  <span className="counter__number">3</span>
                </NavLink>
              </div>

              <div
                className={classNames('menu__icon menu__icon-border', {
                  'icon-active': location.pathname.includes('cart'),
                })}
              >
                <NavLink
                  to="cart"
                  onClick={() => setIsMenuPage(false)}
                  className="icon__action icon__action-bag"
                >
                  <BagIcon fill={iconColor} />
                  <span className="counter__number">3</span>
                </NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};