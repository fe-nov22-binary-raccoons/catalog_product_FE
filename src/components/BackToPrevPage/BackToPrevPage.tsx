import { Link } from 'react-router-dom';
import arrow from '../../icons/arrows/arrow-left-bl.svg';
import './BactToPrevPage.scss';

export const BackToPrevPage: React.FC = () => {
  return (
    <div className="row">
      <div className="col-24 breadcrumbs">
        <Link to={'../'} className="breadcrumbs_button">
          <img
            src={arrow}
            alt="back to the previous page"
            className="breadcrumbs_button-icon"
          />

          <span className="breadcrumbs_button-text">Home</span>
        </Link>
      </div>
    </div>
  );
};
