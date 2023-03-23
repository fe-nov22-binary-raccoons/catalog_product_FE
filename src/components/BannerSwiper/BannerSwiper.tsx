/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useRef } from 'react';
import './BannerSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
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

export const BannerSwiper: React.FC = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { iconColor } = useContext(ThemeContext);

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
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current!,
              nextEl: nextRef.current!,
            }}
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
