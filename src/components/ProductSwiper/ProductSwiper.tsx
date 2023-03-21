/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import { Phone } from '../../types/Phone';
import './ProductSwiper.scss';
import { Loader } from '../Loader';
import { client } from '../../api/fetchClient';
import { PhonesList } from '../../types/PhonesList';
import { PhoneCardForSwiper } from '../PhoneCardForSwiper';

interface Props {
  endPoint: string;
  title: string;
}

export const ProductSwiper: React.FC<Props> = ({ endPoint, title }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [phones, setPhones] = useState<Phone[]>([]);

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
  }, []);

  const btnPrevRef = useRef<HTMLDivElement>(null);
  const btnNextRef = useRef<HTMLDivElement>(null);

  return (
    <div className="product-swiper-box row">
      <div className="col-24 product-swiper-box__header">
        <div className="heading-2 product-swiper-box__title">{title}</div>

        <div className="product-swiper-box__navigation-buttons">
          <div className="navPrev-icon" ref={btnPrevRef}></div>
          <div className="navNext-icon" ref={btnNextRef}></div>
        </div>
      </div>

      {isLoading && !isError ? (
        <Loader />
      ) : (
        <Swiper
          breakpoints={{
            // when window width is >= 640px
            1200: {
              slidesPerView: 4,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
            },
            640: {
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
          onInit={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = btnPrevRef.current;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = btnNextRef.current;
            swiper.navigation.destroy();
            swiper.navigation.init();
            swiper.navigation.update();
          }}
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
