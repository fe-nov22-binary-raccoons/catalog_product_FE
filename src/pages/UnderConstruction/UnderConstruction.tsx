import { NavLink } from 'react-router-dom';
import './UnderConstruction.scss';

export const UnderConstruction: React.FC = () => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24 notready">
        <div className="notready-container">
          <div className="notready__pageParagraph">
            WE WILL FINISH IT
          </div>
          <div className="notready__pageParagraph">
            BUT FIRST THE <span>CRAB SALAD</span>
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

        <span className='notready__icon'></span>
      </div>
    </div>
  </div>
);
