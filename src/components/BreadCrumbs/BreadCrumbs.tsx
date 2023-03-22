import { Link, useLocation } from 'react-router-dom';
import { memo, useContext, useMemo } from 'react';
import cn from 'classnames';
import './BreadCrumbs.scss';
import {
  ReactComponent as ArrowRight,
} from '../../icons/arrows/arrow-right.svg';
import { ReactComponent as HomeIcon } from '../../icons/home.svg';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

type Props = {
  name?: string | undefined;
  id?: string;
};

export const BreadCrumbs: React.FC<Props> = memo(({ name, id }) => {
  const { iconColor } = useContext(ThemeContext);
  const location = useLocation();

  let currentLink = '';

  const crumbs = useMemo(() => {
    return location.pathname
      .split('/')
      .filter((crumb) => crumb !== '')
      .map((crumb, idx) => {
        currentLink += `/${crumb}`;
        const currentPage = idx === 0 ? true : false;

        return (
          <div className="breadcrumbs_crumb" key={crumb}>
            <ArrowRight fill={iconColor} />

            <Link
              to={currentLink}
              className={cn('breadcrumbs_link', {
                'is-current-page': currentPage,
              })}
            >
              {id === crumb ? name : capitalizeFirstLetter(crumb)}
            </Link>
          </div>
        );
      });
  }, [location, name, id, iconColor]);

  return (
    <div className="row">
      <div className="col-24 breadcrumbs">
        <Link to="/">
          <HomeIcon fill={iconColor} />
        </Link>

        {crumbs}
      </div>
    </div>
  );
});

BreadCrumbs.displayName = 'BreadCrumbs';
