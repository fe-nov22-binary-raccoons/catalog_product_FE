// import { PageNotReady } from '../PageNotReady/PageNotReady';
import { NavLink } from 'react-router-dom';
import './ActivationPage.scss';

export const ActivationPage: React.FC = () => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24">
        <div className="activation activation__container">
          <div className="activation__verified"></div>

          <h1 className="heading-1 activation__header">
            Your email has been confirmed
          </h1>

          <NavLink to="/" className="activation__back">
            go to home
          </NavLink>
        </div>
      </div>
    </div>
  </div>
);
