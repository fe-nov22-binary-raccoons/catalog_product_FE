import React from 'react';
import { NavLink } from 'react-router-dom';
import { PageNavLink } from './PageNavLink/PageNavLink';
import './Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="header__top-actions">
        <div className="header__container">
          <div className="header__logo">
            <NavLink to="/" className="logo">
              <div className="logo__image"></div>
              <div className="logo__image--emoji"></div>
            </NavLink>
          </div>

          <nav className="header__nav nav">
            <div className="nav__list">
              <PageNavLink to="/" title="Home" />
              <PageNavLink to="/phones" title="Phones" />
              <PageNavLink to="/tablets" title="Tablets" />
              <PageNavLink to="/accessories" title="Accessories" />
            </div>
          </nav>
        </div>

        <div className="header__menu">
          <div className="icon__container">
            <NavLink to="/favorites" className="icon icon--heart"></NavLink>
          </div>
          <div className="icon__container">
            <NavLink to="bag" className="icon icon--bag"></NavLink>
          </div>
          <div className="icon__container">
            <NavLink to="menu" className="icon icon--menu"></NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
