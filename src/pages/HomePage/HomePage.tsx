import { BannerSwiper } from '../../components/BannerSwiper';
import './HomePage.scss';

export const HomePage = () => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24">
        <h1 className="heading-1 margin-top-50">
          Welcome to Nice Gadgets store!
        </h1>
      </div>
    </div>
    <div className="row margin-bot-30"></div>
    <BannerSwiper />
  </div>
);
