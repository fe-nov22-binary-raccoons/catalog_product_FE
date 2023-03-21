import './MenuPage.scss';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MenuNavLink } from './MenuNavLink/MenuNavLink';

export const MenuPage: React.FC = () => {
  const [isMenuPage, setIsMenuPage] = useState(false);

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

            <div className="menu__buttons-conteiner">
              <div className="menu__icon menu__icon-border">
                <NavLink
                  to="favorites"
                  onClick={() => setIsMenuPage(false)}
                  className="icon__action icon__action-favorites"
                ></NavLink>
              </div>

              <div className="menu__icon menu__icon-border">
                <NavLink
                  to="bag"
                  onClick={() => setIsMenuPage(false)}
                  className="icon__action icon__action-bag"
                ></NavLink>
              </div>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
