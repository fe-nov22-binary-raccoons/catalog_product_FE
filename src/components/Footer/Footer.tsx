import './Footer.scss';
import { ReactComponent as Logo } from '../../images/header/logo.svg';
import { ReactComponent as BackToTop } from '../../icons/arrows/arrow-up.svg';
import { useContext } from 'react';
import { ThemeContext } from '../ThemeProvider/ThemeProvider';

export const Footer: React.FC = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const { iconColor } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="footer__block">
        <a className="footer__logo" href="/">
          <Logo fill={iconColor} />
        </a>

        <div className="footer__links-block">
          <a
            className="footer__links-block__link"
            href="https://github.com/fe-nov22-binary-raccoons"
            target="_blank"
            rel="noreferrer"
          >
            github
          </a>
          <a
            className="footer__links-block__link"
            href="#/contacts"
            rel="noreferrer"
          >
            contacts
          </a>

          <a
            className="footer__links-block__link"
            href="#/rights"
            rel="noreferrer"
          >
            rights
          </a>
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
