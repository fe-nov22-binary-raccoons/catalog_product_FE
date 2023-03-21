/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable max-len */
import { useRef } from 'react';
import './BannerSwiper.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import banner1 from '../../images/bannerSwiper/Banner.png';
import banner2 from '../../images/bannerSwiper/Banner2.png';
import banner3 from '../../images/bannerSwiper/Banner3.png';

export const BannerSwiper: React.FC = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const banners = [
    [banner1, 1],
    [banner2, 2],
    [banner3, 3],
  ];

  return (
    <div className="swiper-box row">
      <div className="col-1 ">
        <div className="swiperNavPrev disabled-left" ref={prevRef}></div>
      </div>
      <div className="col-xl-22 col-md-22 col-sm-24">
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
          // this code we will need for disable button when loop=false
          // onSlideChange={(swiper) => {
          //   if (swiper.activeIndex === 0) {
          //     if (prevRef.current) {
          //       prevRef.current.classList.add('disabled-left');
          //     }
          //   } else {
          //     if (prevRef.current) {
          //       prevRef.current.classList.remove('disabled-left');
          //     }
          //   }

          //   if (swiper.activeIndex === swiper.slides.length - 1) {
          //     if (nextRef.current) {
          //       nextRef.current.classList.add('disabled-right');
          //     }
          //   } else {
          //     if (nextRef.current) {
          //       nextRef.current.classList.remove('disabled-right');
          //     }
          //   }
          // }}
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
              <a href="/#/products/phones">
                <img src={banner[0]} className="banner-image" />
              </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="col-1">
        <div className="swiperNavNext" ref={nextRef}></div>
      </div>

      <div className="swiper-pagination"></div>
    </div>
  );
};
