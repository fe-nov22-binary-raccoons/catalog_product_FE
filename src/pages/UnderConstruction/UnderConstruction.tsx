import { NavLink } from 'react-router-dom';
import './UnderConstruction.scss';

export const UnderConstruction: React.FC = () => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24 notready">
        <div className="notready-container">
          <div className="notready__pageParagraph">
            This page is not ready yet
          </div>
          <div className="notready__pageParagraph">
            Sorry for the inconvenience
          </div>
          <div className="notready__pageParagraph">
            It will be ready soon
          </div>

          <div className="notready__backPage">
            <p className="notready__backParagraph">
            Let&apos;s find a better&nbsp;
              <NavLink to="/" className="notready__back">
                place
              </NavLink>
            &nbsp;for you to go.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
