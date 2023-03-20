import React, { useEffect, useState } from 'react';
import '../page-grid.scss';
import './PhonesPage.scss';
import { PhoneCard } from '../../components/PhoneCard';
import { getPhones } from '../../api/fetchPhones';
import { Phone } from '../../types/Phone';
import { Loader } from '../../components/Loader';
import { Pagination } from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { Sorting } from '../../components/Sorting';
import { SortBy } from '../../types/SortBy';
import { ErrorMessage } from '../../components/ErrorMessage';
import { ErrorMessages } from '../../types/ErrorMessages';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [phonesNum, setPhonesNum] = useState<number>(0);

  const [searchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || '1';
  const pageSize = searchParams.get('size') || '16';
  const sortBy = searchParams.get('sort') || SortBy.Newest;

  const loadPhones = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const phonesFromServer = await getPhones(+currentPage, +pageSize, sortBy);

      setPhones(phonesFromServer.phones);
      setPhonesNum(phonesFromServer.total);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPhones();
  }, [pageSize, currentPage, sortBy]);

  const showPagination
    = !isLoading && !isError && !!phones.length && +pageSize !== phonesNum;
  const showNoPhones = !phones.length && !isError && !isLoading;
  const showPhoneCards = !!phones.length && !isLoading;

  return (
    <div className="phones">
      <div className="container">
        <div className="row">
          <div className="col-24 breadcrumbs">
            {/* <img src="src/icons/home.svg" alt="" /> */}
            Phones (Breadcrumbs)
          </div>
        </div>
        <div className="row">
          <div className="col-24">
            <h1 className="heading-1">Mobile phones</h1>
            <p className="subtitle">{phonesNum} models</p>
          </div>
        </div>

        <Sorting total={phonesNum} />
      </div>
      <div className="container phones-list">
        <div className="row gy-4">
          {showPhoneCards
            && phones.map((ph) => <PhoneCard phone={ph} key={ph.id} />)}

          {isLoading && <Loader />}

          {!phones.length && isError && (
            <ErrorMessage text={ErrorMessages.OnLoad} />
          )}

          {showNoPhones && <ErrorMessage text={ErrorMessages.OnEmptyData} />}
        </div>
      </div>

      {showPagination && (
        <div className="container">
          <div className="row">
            <nav className="pagination-wrap">
              <Pagination total={phonesNum} pageSize={+pageSize} />
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};
