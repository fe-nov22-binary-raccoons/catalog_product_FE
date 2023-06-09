/* eslint-disable max-len */
import {
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

import { BreadCrumbs } from '../../components/BreadCrumbs';
import { getItem } from '../../api/fetchProducts';
import { Loader } from '../../components/Loader';
import { BackToPrevPage } from '../../components/BackToPrevPage';

import { PhoneItem } from '../../types/PhoneItem';

import { ReactComponent as HeartIcon } from '../../icons/buttons/add-to-favorite/favorite-btn.svg';
import { ReactComponent as HeartIconActive } from '../../icons/buttons/add-to-favorite/favorite-btn-active.svg';
import './ProductPage.scss';
import { ThemeContext } from '../../components/ThemeProvider/ThemeProvider';
import { Colors } from '../../types/Colors';
import { colors } from '../../helpers/colorCollection';
import { ProductSwiper } from '../../components/ProductSwiper';
import { CartContext } from '../../components/CartProvider';
import { FavoritesContext } from '../../components/FavoritesContext';
import { PageNotFound } from '../PageNotFound';

export const ProductPage: React.FC = () => {
  const [phoneItem, setPhoneItem] = useState<PhoneItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [mainPhoto, setMainPhoto] = useState<string>('');

  const { iconColor } = useContext(ThemeContext);
  const { isAdded, remove, add } = useContext(CartContext);
  const {
    addFavorite,
    removeFavorite,
    isFavorite,
  } = useContext(FavoritesContext);
  const { pathname } = useLocation();
  const { phoneId = '' } = useParams();

  const isFavoriteProduct = isFavorite(phoneId);

  const handleFavorite = useCallback(() => {
    if (isFavoriteProduct) {
      removeFavorite(phoneId);
    } else {
      addFavorite(phoneId);
    }
  }, [isFavoriteProduct]);

  const handleClickAdded = useCallback(() => {
    if (isAdded(phoneId)) {
      remove(phoneId);

      return;
    }

    add(phoneId);
  }, [isAdded]);

  const loadPhone = useCallback(async () => {
    try {
      const phoneFromServer = await getItem(phoneId);
      const photo = phoneFromServer.images.find((img) => img.includes('00'));

      setPhoneItem(phoneFromServer);
      setIsError(false);

      if (photo) {
        setMainPhoto(photo);
      } else {
        setMainPhoto(phoneFromServer.images[0]);
      }
    } catch (error) {
      setPhoneItem(null);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [phoneId]);

  useEffect(() => {
    loadPhone();
  }, [phoneId]);

  const getNewPhoneByParam = useCallback(
    (id: string, param: string, value: string) => {
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
    },
    [],
  );

  const isColorSelected = useCallback(
    (color: string) => pathname.split('-').includes(color.toLowerCase()),
    [pathname],
  );
  const isCapacitySelected = useCallback(
    (capacity: string) => pathname.split('-').includes(capacity.toLowerCase()),
    [pathname],
  );

  const swiperBreakpoints = {
    1200: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 2.4,
    },
    320: {
      slidesPerView: 1.3,
    },
    1: {
      slidesPerView: 1,
    },
  };

  return (
    <div className="container product">
      {isError
        ? <PageNotFound />
        : (
          <>
            <BreadCrumbs name={phoneItem?.name} id={phoneId} />
            <div className="row">
              <div className="col-24">
                <BackToPrevPage path={'phones'} />
              </div>
            </div>
            {isLoading && <Loader />}

            {!!phoneItem && (
              <>
                <div className="row">
                  <div className="product_title col-24">
                    <h1 className="heading-2">
                      {`${phoneItem.name}`}
                    </h1>
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
                            {phoneItem.colorsAvailable.map((color) => {
                              const colorToType = color as keyof Colors;
                              const colorToRender = colors[colorToType] ?? color;

                              return (
                                <li
                                  key={colorToRender}
                                  style={{ backgroundColor: colorToRender }}
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
                              );
                            })}
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
                          <button
                            className={cn('button buy-btn about-right_buttons-add', {
                              'buy-btn_isAdded': isAdded(phoneId),
                            })}
                            onClick={handleClickAdded}
                          >
                            {isAdded(phoneId)
                              ? 'Added to cart'
                              : 'Add to cart'}
                          </button>

                          <button
                            className="favorites-btn about-right_buttons-like"
                            onClick={handleFavorite}
                          >
                            {!isFavoriteProduct ? (
                              <HeartIcon fill={iconColor} />
                            ) : (
                              <HeartIconActive fill="#476df4" />
                            )}
                          </button>
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
                        <div className="product_info-sp-title">
                          <p className="heading-3">About</p>
                        </div>
                        {phoneItem.description.map(({ title, text }) => (
                          <Fragment key={`${title}${text}`}>
                            <p className="heading-4 product_info-sp-subtitle">
                              {title}
                            </p>
                            <p className="product_info-sp-text">{text}</p>
                          </Fragment>
                        ))}
                      </div>
                      <div className="product_info-sp-block col-xl-11 col-md-24">
                        <div className="product_info-sp-title">
                          <p className="heading-3">Tech specs</p>
                        </div>

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
                <ProductSwiper
                  swiperBreakpoints = {swiperBreakpoints}
                  endPoint={`products/${phoneId}/recommended`}
                  title="You may also like" />
              </>
            )}
          </>
        )}
    </div>
  );
};
