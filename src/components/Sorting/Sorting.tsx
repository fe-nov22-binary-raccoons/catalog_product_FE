import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { SortBy } from '../../types/SortBy';
import './Sorting.scss';

type Props = {
  total: number;
};

export const Sorting: React.FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('size') || '16';
  const sortBy = searchParams.get('sort') || 'age';

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('size', event.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleSortBy = (event: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sort', event.target.value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  return (
    <>
      <div className="row phones_sort-title">
        <label
          className="col-xl-4 col-lg-8 col-md-8 col-sm-12"
          htmlFor="sort-select"
        >
          Sort By
        </label>
        <label
          className="col-xl-3 col-lg-6 col-md-8 col-sm-12"
          htmlFor="amount-select"
        >
          Items on page
        </label>
      </div>

      <div className="row phones_sort">
        <div className="col-xl-4 col-lg-8 col-md-8 col-sm-12">
          <select
            value={sortBy}
            className="col-24 sort-select"
            name="sort-by"
            id="sort-select"
            onChange={handleSortBy}
          >
            <option className="sort-option" value={SortBy.Newest}>
              Newest
            </option>
            <option className="sort-option" value={SortBy.Alphabet}>
              Alphabet
            </option>
            <option className="sort-option" value={SortBy.Cheapest}>
              Cheapest
            </option>
          </select>
        </div>
        <div className="col-xl-3 col-lg-6 col-md-8 col-sm-12">
          <select
            value={pageSize}
            className="col-24 sort-select"
            name="amount-select"
            id="amount-select"
            onChange={handlePageSize}
          >
            <option className="sort-option" value="4">
              4
            </option>
            <option className="sort-option" value="8">
              8
            </option>
            <option className="sort-option" selected value="16">
              16
            </option>
            <option className="sort-option" value={`${total}`}>
              all
            </option>
          </select>
        </div>
      </div>
    </>
  );
};
