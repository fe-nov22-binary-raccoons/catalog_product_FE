import { NavLink } from 'react-router-dom';
import './PageNotFound.scss';

export const PageNotFound: React.FC = () => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24 notfound">
        <div className="notfound__holy">
            Holy raccoons
          <span className='notfound__icon notfound__icon-up'></span>
        </div>

        <div className="notfound__error">
          404
        </div>

        <div className="notfound__pageParagraph">
          Our raccoons searched high and low
        </div>
        <div className="notfound__pageParagraph">
          but couldn&apos;t find what you&apos;re looking for.
        </div>

        <div className="notfound__backPage">
          <p className="notfound__backParagraph">
            Let&apos;s find a better&nbsp;
            <NavLink to="/" className="notfound__back">
            place
            </NavLink>
            &nbsp;for you to go.
          </p>
        </div>
      </div>
    </div>
  </div>
);
