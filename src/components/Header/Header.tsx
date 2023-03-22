import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PageNavLink } from './PageNavLink/PageNavLink';

import { ReactComponent as Logo } from '../../images/header/logo.svg';
import {
  ReactComponent as HeartIcon,
} from '../../images/header/heart_icon.svg';
import {
  ReactComponent as BagIcon,
} from '../../images/header/bag_icon.svg';

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import './Header.scss';
import { MenuPage } from '../../pages/MenuPage';
import { FavoritesContext } from '../FavoritesContext';


export const Header: React.FC = () => {
  const { theme, toggleTheme, iconColor } = useContext(ThemeContext);
  const { favorites } = useContext(FavoritesContext);

  return (
    <div className="header">
      <div className="header__top-actions">
        <div className="header__container">
          <div className="header__logo">
            <NavLink to="/" className="logo">
              <Logo fill={iconColor} />
            </NavLink>
          </div>

          <nav className="header__nav nav">
            <div className="nav__list">
              <PageNavLink to="/" title="Home" />
              <PageNavLink to="phones" title="Phones" />
              <PageNavLink to="tablets" title="Tablets" />
              <PageNavLink to="accessories" title="Accessories" />
            </div>
          </nav>
        </div>

        <div className="header__theme-switch">
          <DarkModeSwitch
            style={{
              padding: '1px',
            }}
            moonColor='#0f0f11'
            sunColor='#75767f'
            checked={theme === 'light'}
            onChange={toggleTheme}
            size={25}
          />
        </div>

        <div className="header__menu">
          <div className="icon__container">
            <NavLink to="favorites" className="icon icon--heart">
              <HeartIcon fill={iconColor} />
              {favorites.length > 0 && (
                <span className="counter__number">{favorites.length}</span>
              )}
            </NavLink>
          </div>
          <div className="icon__container">
            <NavLink to="cart" className="icon icon--bag">
              <BagIcon fill={iconColor} />
              <span className="counter__number">3</span>
            </NavLink>
          </div>

          <div className="icon__container">
            <MenuPage />
          </div>
        </div>
      </div>
    </div>
  );
};
