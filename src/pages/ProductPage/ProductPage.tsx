/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';
import { getItem } from '../../api/fetchPhones';
import { Loader } from '../../components/Loader';
import { PhoneItem } from '../../types/PhoneItem';
import './ProductPage.scss';

export const ProductPage: React.FC = () => {
  const [phoneItem, setPhoneItem] = useState<PhoneItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [mainPhoto, setMainPhoto] = useState<string>('');
  const { pathname } = useLocation();

  const { phoneId = '' } = useParams();

  const loadPhone = async () => {
    try {
      const phoneFromServer = await getItem(phoneId);
      const photo = phoneFromServer.images.find((img) => img.includes('00'));

      setPhoneItem(phoneFromServer);

      if (photo) {
        setMainPhoto(photo);
      } else {
        setMainPhoto(phoneFromServer.images[0]);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPhone();
  }, [phoneId]);

  const getNewPhoneByParam = (id: string, param: string, value: string) => {
    const splittedId = id.split('-');

    if (param === 'color') {
      splittedId[splittedId.length - 1] = value.toLowerCase();
    }

    if (param === 'capacity') {
      splittedId[splittedId.length - 2] = value.toLowerCase();
    }

    const idWithNewParams = splittedId.join('-');

    if (pathname === idWithNewParams) {
      return location.pathname;
    }

    return `../${idWithNewParams}`;
  };

  const isColorSelected = (color: string) =>
    pathname.split('-').includes(color.toLowerCase());
  const isCapacitySelected = (capacity: string) =>
    pathname.split('-').includes(capacity.toLowerCase());

  return (
    <div className="container product">
      <div className="row">
        <div className="col-24 breadcrumbs">
          <img src="src/icons/home.svg" alt="" />
          Phones (Breadcrumbs)
        </div>
      </div>

      <div className="row">
        <div className="col-24 breadcrumbs">
          <p>Back</p>
        </div>
      </div>

      {isLoading && <Loader />}

      {isError && <p>Error</p>}

      {!!phoneItem && (
        <>
          <div className="row">
            <div className="col-24">
              <h1 className="product_title heading-2">{`${phoneItem.name}`}</h1>
            </div>
          </div>
          <section className="product_info">
            <article className="product_info-fp">
              <div className="row">
                <div className="col-xl-13 col-md-14 col-sm-24">
                  <div className="row product_info-fp-photos">
                    <ul className="col-xl-4 col-md-4 col-sm-24 product_info-fp-photos-gallery">
                      {phoneItem.images.map((img) => (
                        <li
                          key={img}
                          className={cn('product_info-fp-photos-gallery-item', {
                            'is-img-selected': mainPhoto === img,
                          })}
                          onClick={() => setMainPhoto(img)}
                        >
                          <img
                            src={img}
                            alt={phoneItem.name}
                            className="product_info-fp-photos-gallery-img"
                          />
                        </li>
                      ))}
                    </ul>

                    <div className="col-xl-20 col-md-20 col-sm-24">
                      <div className="product_info-fp-photos-main-photo">
                        <img
                          src={mainPhoto}
                          alt={phoneItem.name}
                          className="product_info-fp-photos-main-photo-img"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-7 col-md-10 product_info-fp-about-right about-right">
                  <div className="about-right_color-selector">
                    <p className="about-right_color-selector-title">
                      Available colors
                    </p>

                    <ul className="about-right_color-selector-list">
                      {phoneItem.colorsAvailable.map((color) => (
                        <li
                          key={color}
                          style={{ backgroundColor: color }}
                          className={cn('about-right_color-selector-item', {
                            'is-color-selected': isColorSelected(color),
                          })}
                        >
                          <Link
                            to={getNewPhoneByParam(
                              phoneItem.id,
                              'color',
                              color,
                            )}
                            className="about-right_color-selector-link"
                          ></Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="about-right_capacity-selector">
                    <p className="about-right_capacity-selector-title">
                      Select capacity
                    </p>

                    <ul className="about-right_capacity-selector-list">
                      {phoneItem.capacityAvailable.map((capacity) => (
                        <li
                          key={capacity}
                          className="about-right_capacity-selector-item"
                        >
                          <Link
                            to={getNewPhoneByParam(
                              phoneItem.id,
                              'capacity',
                              capacity,
                            )}
                            className={cn(
                              'about-right_capacity-selector-link',
                              {
                                'is-capacity-selected':
                                  isCapacitySelected(capacity),
                              },
                            )}
                          >
                            {capacity}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="about-right_prices">
                    <p className="about-right_current-price">
                      ${phoneItem.priceDiscount}
                    </p>
                    <p className="about-right_old-price">
                      ${phoneItem.priceRegular}
                    </p>
                  </div>

                  <div className="buttons about-right_buttons">
                    <button className="buttons_buy-btn about-right_buttons-add">
                      Add to card
                    </button>

                    <a
                      href="#"
                      className="buttons_favorites-btn about-right_buttons-like"
                    ></a>
                  </div>
                  <div className="about-right_descriptions">
                    <div className="characteristic">
                      <p className="characteristic-title">Screen</p>
                      <p className="characteristic-value">{phoneItem.screen}</p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Resolution</p>
                      <p className="characteristic-value">
                        {phoneItem.resolution}
                      </p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Processor</p>
                      <p className="characteristic-value">
                        {phoneItem.processor}
                      </p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Ram</p>
                      <p className="characteristic-value">{phoneItem.ram}</p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
            <article className="product_info-sp">
              <div className="row">
                <div className="product_info-sp-block col-xl-13 col-md-24">
                  <p className="heading-3 product_info-sp-title">About</p>

                  {phoneItem.description.map(({ title, text }) => (
                    <>
                      <p className="heading-4 product_info-sp-subtitle">
                        {title}
                      </p>
                      <p className="product_info-sp-text">{text}</p>
                    </>
                  ))}
                </div>
                <div className="product_info-sp-block col-xl-11 col-md-24">
                  <p className="heading-3 product_info-sp-title">Tech specs</p>

                  <div className="product_info-sp-descriptions">
                    <div className="characteristic">
                      <p className="characteristic-title">Screen</p>
                      <p className="characteristic-value">{phoneItem.screen}</p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Resolution</p>
                      <p className="characteristic-value">
                        {phoneItem.resolution}
                      </p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Processor</p>
                      <p className="characteristic-value">
                        {phoneItem.processor}
                      </p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">RAM</p>
                      <p className="characteristic-value">{phoneItem.ram}</p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Built in memory</p>
                      <p className="characteristic-value">
                        {phoneItem.capacity}
                      </p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Camera</p>
                      <p className="characteristic-value">{phoneItem.camera}</p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Zoom</p>
                      <p className="characteristic-value">{phoneItem.zoom}</p>
                    </div>

                    <div className="characteristic">
                      <p className="characteristic-title">Cell</p>
                      <p className="characteristic-value">
                        {phoneItem.cell.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </>
      )}
    </div>
  );
};
