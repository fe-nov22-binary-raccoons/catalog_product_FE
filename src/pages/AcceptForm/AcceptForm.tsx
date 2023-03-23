// import { PageNotReady } from '../PageNotReady/PageNotReady';
// import { NavLink } from 'react-router-dom';
import './AcceptForm.scss';

type Props = {
  setAcceptForm: React.Dispatch<React.SetStateAction<boolean>>
};

export const AcceptForm: React.FC<Props> = ({ setAcceptForm }) => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24">
        <div className="form form__container">

          <div className="form__message">
            <div className="form__verified"></div>

            <h1 className="form__header">
              Your message was added
            </h1>
          </div>

          <button
            onClick={() => (setAcceptForm(false))}
            className="form__continue"
            type="submit">
              Continue
          </button>
        </div>
      </div>
    </div>
  </div>
);
