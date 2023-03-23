import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ReactComponent as ArrowLeft,
} from '../../icons/arrows/arrow-left-bl.svg';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import './BactToPrevPage.scss';

interface Props {
  path?: string
}

export const BackToPrevPage: React.FC<Props> = ({ path }) => {
  const { iconColor } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleClick = () => {
    if (path) {
      return navigate(`/${path}`, { replace: true });
    }

    return navigate(-1);
  };

  return (
    <div className="row">
      <div className="col-24 back-to-prev">
        <button className="back-to-prev_button" onClick={handleClick}>
          <ArrowLeft fill={iconColor} />
          <span className="back-to-prev_button-text">Back</span>
        </button>
      </div>
    </div>
  );
};
