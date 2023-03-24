/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useEffect, useRef, useState } from 'react';
import './BannerSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import {
  ReactComponent as ArrowLeft,
} from '../../images/bannerSwiper/stroke-left.svg';
import {
  ReactComponent as ArrowRight,
} from '../../images/bannerSwiper/stroke-right.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

import Banner from '../../images/bannerSwiper/Banner3.png';
import Banner320 from '../../images/bannerSwiper/banner-320.png';

export const BannerSwiper: React.FC = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { iconColor } = useContext(ThemeContext);

  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');

    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addListener(handleMediaQueryChange);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const banners = [
    {
      id: 1,
    },
    { id: 2,
    },
    {
      id:3,
    },
  ];

  return (
    <div className="swiper-box">
      <div className="swiper-box__navigation">
        <div className="swiperNavPrev" ref={prevRef}>
          <ArrowLeft fill={iconColor} />
        </div>
        <div className="slides-box">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
            autoplay={{ delay: 1500 }}
            spaceBetween={10}
            speed={800}
            slidesPerView={1}
            loop={true}
            pagination={{
              el: '.swiper-pagination',
              clickable: true,
              bulletActiveClass: 'bullet-active',
              bulletClass: 'bullet',
            }}
            className="banner-swiper"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id}>
                <div className='swiperSlide'>
                  <a
                    href="#/phones/apple-iphone-11-64gb-black"
                    className='swiperSlide__link'
                  >
                    {isMobile
                      ? (
                        <img
                          src={Banner320}
                          alt="Banner New Phone IPhone 14"
                          className='swiperSlide__img'
                        />
                      ) : (
                        <img
                          src={Banner}
                          alt="Banner New Phone IPhone 14"
                          className='swiperSlide__img'
                        />
                      )}
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiperNavNext" ref={nextRef}>
          <ArrowRight fill={iconColor} />
        </div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
