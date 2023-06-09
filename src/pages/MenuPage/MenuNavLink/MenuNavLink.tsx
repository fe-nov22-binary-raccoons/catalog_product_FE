import classNames from 'classnames';
import { memo } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  title: string;
  setIsMenuPage: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MenuNavLink: React.FC<Props> = memo(({
  to,
  title,
  setIsMenuPage,
}) => (
  <NavLink
    to={to}
    onClick={() => setIsMenuPage(false)}
    className={({ isActive }) =>
      classNames('menu__item', { 'item-active': isActive })
    }
  >
    {title}
  </NavLink>
));

MenuNavLink.displayName = 'MenuNavLink';
