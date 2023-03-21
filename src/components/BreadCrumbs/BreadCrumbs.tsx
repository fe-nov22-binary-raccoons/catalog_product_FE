import { Link, useLocation } from 'react-router-dom';
import { memo, useMemo } from 'react';
import cn from 'classnames';
import './BreadCrumbs.scss';
import arrow from '../../icons/arrows/arrow-right.svg';
import house from '../../icons/home.svg';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';

type Props = {
  name?: string | undefined;
  id?: string;
};

export const BreadCrumbs: React.FC<Props> = memo(({ name, id }) => {
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
            <img
              src={arrow}
              alt="arrow icon"
              className="breadcrumbs_arrow-icon"
            />
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
  }, [location]);

  return (
    <div className="row">
      <div className="col-24 breadcrumbs">
        <img src={house} alt="house icon" className="breadcrumbs_house-icon" />
        {crumbs}
      </div>
    </div>
  );
});

BreadCrumbs.displayName = 'BreadCrumbs';
