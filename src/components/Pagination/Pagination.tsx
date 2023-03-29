import classNames from 'classnames';
import React, { useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../helpers/paginationHelper';
import { SearchLink } from '../SearchLink';

import { ReactComponent as ArrowLeft } from '../../icons/arrows/arrow-left.svg';
import {
  ReactComponent as ArrowRight,
} from '../../icons/arrows/arrow-right.svg';
import './Pagination.scss';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

type Props = {
  total: number;
  pageSize: number;
};

export const Pagination: React.FC<Props> = ({ total, pageSize }) => {
  const { iconColor } = useContext(ThemeContext);
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const lastPage = Math.ceil(total / pageSize);
  const pageList = getNumbers(+currentPage, lastPage, 4);

  return (
    <div className="container">
      <div className="row">
        <nav className="pagination-wrap">
          <ul className="pagination">
            <li
              className={classNames('page-item', {
                disabled: +currentPage === 1,
              })}
            >
              <SearchLink
                className="page-link arrow-left"
                aria-disabled={+currentPage === 1}
                params={{
                  page: String(+currentPage - 1),
                }}
              >
                <ArrowLeft fill={iconColor} />
              </SearchLink>
            </li>
            {pageList.map((page) => (
              <li
                key={page}
                className={classNames('page-item', {
                  active: page === +currentPage,
                })}
              >
                <SearchLink
                  className="page-link"
                  params={{
                    page: String(page),
                  }}
                >
                  {page}
                </SearchLink>
              </li>
            ))}
            <li
              className={classNames('page-item', {
                disabled: +currentPage === lastPage,
              })}
            >
              <SearchLink
                className="page-link arrow-right"
                aria-disabled={+currentPage === lastPage}
                params={{
                  page: String(+currentPage + 1),
                }}
              >
                <ArrowRight fill={iconColor} />
              </SearchLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
