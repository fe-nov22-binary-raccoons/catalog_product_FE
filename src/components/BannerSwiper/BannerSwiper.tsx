/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useContext, useRef } from 'react';
import './BannerSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import banner1 from '../../images/bannerSwiper/Banner.png';
import banner2 from '../../images/bannerSwiper/Banner2.png';
import banner3 from '../../images/bannerSwiper/Banner3.png';
import { ReactComponent as ArrowLeft } from '../../images/bannerSwiper/stroke-left.svg';
import { ReactComponent as ArrowRight } from '../../images/bannerSwiper/stroke-right.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

export const BannerSwiper: React.FC = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { iconColor } = useContext(ThemeContext);

  const banners = [
    [banner1, 1],
    [banner2, 2],
    [banner3, 3],
  ];

  return (
    <div className="swiper-box">
      <div className="swiper-box__navigation">
        <div className="swiperNavPrev" ref={prevRef}></div>
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
            onInit={(swiper) => {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.prevEl = prevRef.current;
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              // eslint-disable-next-line no-param-reassign
              swiper.params.navigation.nextEl = nextRef.current;
              swiper.navigation.destroy();
              swiper.navigation.init();
              swiper.navigation.update();
            }}
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner[1]}>
                <a href="#/phones/apple-iphone-11-64gb-black">
                  <img src={banner[0]} className="banner-image" />
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="swiperNavNext" ref={nextRef}></div>
      </div>
      <div className="swiper-pagination"></div>
    </div>
  );
};
