// import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  to: string
  title: string
};

export const PageNavLink: React.FC<Props> = ({ to, title }) => (
  <NavLink
    className={({ isActive }) => (classNames('nav__item', {
      'is-active': isActive,
    }))}
    to={to}
  >
    {title}
  </NavLink>
);
