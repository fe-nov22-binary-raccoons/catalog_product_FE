import classNames from 'classnames';
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNumbers } from '../../utils/paginationHelper';
import { SearchLink } from '../SearchLink';
import './Pagination.scss';

type Props = {
  total: number;
  pageSize: number;
};

export const Pagination: React.FC<Props> = ({ total, pageSize }) => {
  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const lastPage = Math.ceil(total / pageSize);
  const pageList = getNumbers(+currentPage, lastPage, 4);

  return (
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
          {/* ‹ */}
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
          {/* › */}
        </SearchLink>
      </li>
    </ul>
  );
};
