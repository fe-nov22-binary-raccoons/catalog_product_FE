import React, { useEffect, useState } from 'react';
import '../page-grid.scss';
import './PhonesPage.scss';
import { PhoneCard } from '../../components/PhoneCard';
import { getPhones } from '../../api/fetchPhones';
import { Phone } from '../../types/Phone';
import { Loader } from '../../components/Loader';

export const PhonesPage: React.FC = () => {
  const [phones, setPhones] = useState<Phone[]>([]);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(16);
  const [pageNum] = useState<number>(1);

  const handlePageSize = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(+event.target.value);
  };

  const loadPhones = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const phonesFromServer = await getPhones(pageNum, pageSize);

      setPhones(phonesFromServer);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPhones();
  }, [pageSize]);

  return (
    <div className="phones">
      <div className="container">
        <div className="row">
          <div className="col-24 breadcrumbs">
            <img src="src/icons/home.svg" alt="" />
            Phones (Breadcrumbs)
          </div>
        </div>
        <div className="row">
          <div className="col-24">
            <h1 className="heading-1">Mobile phones</h1>
            <p className="subtitle">95 models</p>
          </div>
        </div>
        <div className="row phones_sort-title">
          <label className="col-4" htmlFor="sort-select">
            Sort By
          </label>
          <label className="col-3" htmlFor="amount-select">
            Items on page
          </label>
        </div>

        <div className="row phones_sort">
          <div className="col-4">
            <select
              className="col-24 sort-select"
              name="sort-by"
              id="sort-select"
            >
              <option className="sort-option" value="newest">
                Newest
              </option>
              <option className="sort-option" value="alph">
                Alphabetically
              </option>
              <option className="sort-option" value="cheapest">
                Cheapest
              </option>
            </select>
          </div>
          <div className="col-3">
            <select
              onChange={handlePageSize}
              value={pageSize}
              className="col-24 sort-select"
              name="amount-select"
              id="amount-select"
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
              <option className="sort-option" value="all">
                all
              </option>
            </select>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row gy-4">
          {!!phones.length
            && !isLoading
            && phones.map((ph) => <PhoneCard phone={ph} key={ph.id} />)}

          {isLoading && <Loader />}

          {!phones.length && isError && (
            <h2 className="heading-2">Something went wrong</h2>
          )}

          {!phones.length && !isError && !isLoading && (
            <h2 className="heading-2">There are no phones yet</h2>
          )}

          {/* {phones.map((phone) => (
            <PhoneCard phone={phone} key={phone.id} />
          ))} */}
        </div>
      </div>
    </div>
  );
};
