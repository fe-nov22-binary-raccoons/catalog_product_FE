import { useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  ReactComponent as ArrowLeft,
} from '../../icons/arrows/arrow-left-bl.svg';
import { ThemeContext } from '../../test/ThemeProvider';
import './BactToPrevPage.scss';

export const BackToPrevPage: React.FC = () => {
  const { iconColor } = useContext(ThemeContext);

  return (
    <div className="row">
      <div className="col-24 back-to-prev">
        <Link to={'../'} className="back-to-prev_button">
          <ArrowLeft fill={iconColor} />

          <span className="back-to-prev_button-text">Back</span>
        </Link>
      </div>
    </div>
  );
};
