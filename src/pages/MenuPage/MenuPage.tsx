import './MenuPage.scss';
import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuNavLink } from './MenuNavLink/MenuNavLink';
import classNames from 'classnames';

export const MenuPage: React.FC = () => {
  const [isMenuPage, setIsMenuPage] = useState(false);
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
          <div className="icon icon--menu"></div>
        </button>
      </div>

      {isMenuPage && (
        <div className="menu">
          <nav className="menu__nav">
            <div className="menu__header">
              <div className="menu__logo">
                <NavLink to="../home" className="menu__logo-image"></NavLink>
              </div>

              <button
                onClick={() => setIsMenuPage(false)}
                type="button"
                className="menu__button"
              >
                <div className="icon icon--close"></div>
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
