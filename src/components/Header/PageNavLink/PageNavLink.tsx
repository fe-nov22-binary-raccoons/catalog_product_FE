import classNames from 'classnames';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
};

export const PageNavLink: React.FC<Props> = memo(({ to, title }) => (
  <NavLink
    className={({ isActive }) =>
      classNames('nav__item', {
        'is-active': isActive,
      })
    }
    to={to}
  >
    {title}
  </NavLink>
));

PageNavLink.displayName = 'PageNavLink';
