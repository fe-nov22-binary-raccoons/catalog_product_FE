import './Footer.scss';
import { ReactComponent as LogoEmoji } from '../../images/footer/ok-emoji.svg';
import { ReactComponent as Logo } from '../../images/footer/nice-gadgets.svg';
import { ReactComponent as BackToTop } from '../../icons/arrows/arrow-up.svg';
import { useContext } from 'react';
import { ThemeContext } from '../../test/ThemeProvider';

export const Footer: React.FC = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const { iconColor } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="footer__block">
        <a className="logo" href="/">
          <Logo fill={iconColor} />
          <LogoEmoji />
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
            href=""
            target="_blank"
            rel="noreferrer"
          >
            contacts
          </a>

          <a
            className="footer__links-block__link"
            href=""
            target="_blank"
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
