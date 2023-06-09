/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { memo, useContext, useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';

import { Phone } from '../../types/Phone';
import { Loader } from '../Loader';
import { client } from '../../api/fetchClient';
import { PhonesList } from '../../types/PhonesList';
import { PhoneCardForSwiper } from '../SwiperCard';

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
  swiperBreakpoints: Record<number, { slidesPerView: number }>
}

export const ProductSwiper: React.FC<Props> = memo(({
  endPoint,
  title,
  swiperBreakpoints,
}) => {
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
    <div className="product-swiper-box">
      <div className="product-swiper-box__header">
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
          breakpoints={
            swiperBreakpoints
          //   {
          //   1200: {
          //     slidesPerView: 4,
          //   },
          //   768: {
          //     slidesPerView: 3,
          //   },
          //   640: {
          //     slidesPerView: 2.4,
          //   },
          //   569: {
          //     slidesPerView: 2.6,
          //   },
          //   519: {
          //     slidesPerView: 2.4,
          //   },
          //   480: {
          //     slidesPerView: 2,
          //   },
          //   412: {
          //     slidesPerView:1.8,
          //   },
          //   360: {
          //     slidesPerView: 1.6,
          //   },
          //   320: {
          //     slidesPerView: 1.5,
          //   },
          //   1: {
          //     slidesPerView: 1,
          //   },
          // }
          }
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

      {!isLoading && isError && <div className='heading-3 error-message'>
        Loading Error
      </div>}
    </div>
  );
});

ProductSwiper.displayName = 'ProductSwiper';
