/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { useContext, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import { Phone } from '../../types/Phone';
import { Loader } from '../Loader';
import { client } from '../../api/fetchClient';
import { PhonesList } from '../../types/PhonesList';
import { PhoneCardForSwiper } from '../PhoneCardForSwiper';

import './ProductSwiper.scss';
import {
  ReactComponent as ArrowLeft,
} from '../../icons/arrows/arrow-left.svg';
import {
  ReactComponent as ArrowRight,
} from '../../icons/arrows/arrow-right.svg';
import { ThemeContext } from '../ThemeProvider';

interface Props {
  endPoint: string;
  title: string;
}

export const ProductSwiper: React.FC<Props> = ({ endPoint, title }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);
  const { iconColor } = useContext(ThemeContext);

  const loadPhones = async () => {
    setIsLoading(true);

    try {
      setIsError(false);
      const phonesFromServer = await client.get<PhonesList>(endPoint);

      setPhones(phonesFromServer.products);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadPhones();
  }, [endPoint]);

  const btnPrevRef = useRef<HTMLDivElement>(null);
  const btnNextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="product-swiper-box row">
      <div className="col-24 product-swiper-box__header">
        <div className="heading-2 product-swiper-box__title">{title}</div>

        <div className="product-swiper-box__navigation-buttons">
          <div className="navPrev-icon" ref={btnPrevRef}>
            <ArrowLeft fill={iconColor} />
          </div>
          <div className="navNext-icon" ref={btnNextRef}>
            <ArrowRight fill={iconColor} />
          </div>
        </div>
      </div>

      {isLoading && !isError ? (
        <Loader />
      ) : (
        <Swiper
          breakpoints={{
            // when window width is >= 1200px
            1200: {
              slidesPerView: 4,
            },
            768: {
              slidesPerView: 3,
            },
            642: {
              slidesPerView: 2.4,
            },
            320: {
              slidesPerView: 1.3,
            },
          }}
          modules={[Navigation]}
          navigation={{
            prevEl: btnPrevRef.current!,
            nextEl: btnNextRef.current!,
          }}
          spaceBetween={16}
          speed={800}
          slidesPerView={4}
          loop={true}
          className="product-swiper"
        >
          {phones.map((phone) => (
            <SwiperSlide key={phone.phoneId}>
              <PhoneCardForSwiper phone={phone} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {!isLoading && isError && <p>loading error</p>}
    </div>
  );
};
