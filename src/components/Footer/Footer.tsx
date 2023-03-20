import './Footer.scss';
import emoji from '../../images/footer/ok-emoji.svg';
import logo from '../../images/footer/nice-gadgets.svg';
import chevron from '../../images/footer/chevron-top.svg';

export const Footer: React.FC = () => {
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="footer">
      <div className="footer__block">
        <a className="logo" href="#/">
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
            <img className="to-top-btn__chevron" src={chevron} />
          </div>
        </button>
      </div>
    </footer>
  );
};
