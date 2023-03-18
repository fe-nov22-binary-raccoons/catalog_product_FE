import { useSearchParams } from 'react-router-dom';
import { Option } from '../../types/Option';
import { SortBy } from '../../types/SortBy';
import { CustomSelect } from '../CustomSelect';
import './Sorting.scss';

type Props = {
  total: number;
};

export const Sorting: React.FC<Props> = ({ total }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageSize = searchParams.get('size') || '16';
  const sortBy = searchParams.get('sort') || 'age';

  const options: Option[] = [
    { value: SortBy.Newest, label: 'Newest' },
    { value: SortBy.Alphabet, label: 'Alphabet' },
    { value: SortBy.Cheapest, label: 'Cheapest' },
  ];

  const pageSizes: Option[] = [
    { value: '4', label: '4' },
    { value: '8', label: '8' },
    { value: '16', label: '16' },
    { value: String(total), label: 'All' },
  ];

  const handleOptionChange = (value: string) => {
    searchParams.set('sort', value);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handlePageSizeChange = (value: string) => {
    searchParams.set('size', value);
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
          <CustomSelect
            options={options}
            value={sortBy}
            onChange={handleOptionChange}
          />
        </div>
        <div className="col-xl-3 col-lg-6 col-md-8 col-sm-12">
          <CustomSelect
            options={pageSizes}
            value={pageSize}
            onChange={handlePageSizeChange}
          />
        </div>
      </div>
    </>
  );
};
