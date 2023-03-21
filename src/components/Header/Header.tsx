import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { PageNavLink } from './PageNavLink/PageNavLink';

import { ReactComponent as Heart } from '../../images/header/heart_icon.svg';
import { ReactComponent as CartIcon } from '../../images/header/bag_icon.svg';
import { ReactComponent as LogoEmoji } from '../../images/footer/ok-emoji.svg';
import { ReactComponent as Logo } from '../../images/footer/nice-gadgets.svg';

import { DarkModeSwitch } from 'react-toggle-dark-mode';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import './Header.scss';
import { MenuPage } from '../../pages/MenuPage';


export const Header: React.FC = () => {
  const { theme, toggleTheme, iconColor } = useContext(ThemeContext);

  return (
  <div className="header">
    <div className="header__top-actions">
      <div className="header__container">
        <div className="header__logo">
          <NavLink to="/" className="logo">
            <div className="logo__image"></div>
            <Logo  fill={iconColor} className="logo__image"/>
            <LogoEmoji className="logo__image--emoji"/>
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

      <div className="header__menu">
        <div className="icon__container">
          <NavLink to="/favorites" className="icon icon--heart"></NavLink>
          <div className="counter__number">3</div>
        </div>
        <div className="icon__container">
          <NavLink to="bag" className="icon icon--bag"></NavLink>
          <div className="counter__number">3</div>
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

        <div className="icon__container">
          <MenuPage />
        </div>
      </div>
    </div>
  </div>
);
