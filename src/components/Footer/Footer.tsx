import './Footer.scss';
import { ReactComponent as Logo } from '../../images/header/logo.svg';
import { ReactComponent as BackToTop } from '../../icons/arrows/arrow-up.svg';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const { iconColor } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="footer__block">
        <Link
          className="footer__logo"
          to='/'
          onClick={() => scrollToTop()}
        >
          <Logo fill={iconColor} />
        </Link>

        <div className="footer__links-block">
          <a
            className="footer__links-block__link"
            href="https://github.com/fe-nov22-binary-raccoons"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          <Link
            className="footer__links-block__link"
            to="contacts"
            rel="noreferrer"
            onClick={() => scrollToTop()}
          >
            contacts
          </Link>

          <Link
            className="footer__links-block__link"
            to="rights"
            rel="noreferrer"
            onClick={() => scrollToTop()}
          >
            rights
          </Link>
        </div>

        <button className="to-top-btn" onClick={scrollToTop}>
          Back to top
          <div className="to-top-btn__icon">
            <BackToTop fill={iconColor} />
          </div>
        </button>
      </div>
    </footer>
  );
};
