import './Footer.scss';
import emoji from '../../images/footer/ok-emoji.svg';
import logo from '../../images/footer/nice-gadgets.svg';
import { ReactComponent as Logo } from '../../icons/arrows/arrow-left.svg';
// import { useContext } from 'react';
// import { ThemeContext } from '../../test/ThemeProvider';

export const Footer: React.FC = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // const { iconColor } = useContext(ThemeContext);

  return (
    <footer className="footer">
      <div className="footer__block">
        <a className="logo" href="/">
          <img src={logo} />
          <img src={emoji} className="logo__emoji" />
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
            {/* <span className="to-top-btn__chevron" /> */}
            <Logo />
          </div>
        </button>
      </div>
    </footer>
  );
};
