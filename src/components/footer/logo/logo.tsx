import '../footer.scss';
import logo from '../../../images/footer/logo.svg';
import emoji from '../../../images/footer/ok-emoji.svg';

export const Logo: React.FC = () => (
  <div>
    <a className="logo" href="#home">
      <img src={logo} className="logo__image" />
      <img src={emoji} className="logo__emoji" />
    </a>
  </div>
);
