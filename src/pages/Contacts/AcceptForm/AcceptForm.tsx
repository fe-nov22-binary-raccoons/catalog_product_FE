import { memo } from 'react';
import './AcceptForm.scss';

type Props = {
  setAcceptForm: React.Dispatch<React.SetStateAction<boolean>>
};

export const AcceptForm: React.FC<Props> = memo(({ setAcceptForm }) => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24">
        <div className="form form__container">

          <div className="form__message">
            <div className="form__verified"></div>

            <h1 className="form__header">
              Your message was sent
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
));

AcceptForm.displayName = 'AcceptForm';
