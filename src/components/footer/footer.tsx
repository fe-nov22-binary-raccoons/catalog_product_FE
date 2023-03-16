import './footer.scss';
import logo from '../../images/footer/logo.svg';
import emoji from '../../images/footer/ok-emoji.svg';
import chevron from '../../images/footer/chevron-top.svg';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__block">
        <a className="logo" href="#home">
          <img src={logo} className="logo__image" />
          <img src={emoji} className="logo__emoji" />
        </a>

        <div className="footer__links-block">
          <a
            className="footer__links-block__link"
            href="https://github.com/fe-nov22-binary-raccoons"
          >
            github
          </a>
          <a className="footer__links-block__link" href="">
            contacts
          </a>

          <a className="footer__links-block__link" href="">
            rights
          </a>
        </div>

        <a className="to-top-btn" href="#top">
          Back to top
          <div className="to-top-btn__icon">
            <img className="to-top-btn__chevron" src={chevron} />
          </div>
        </a>
      </div>
    </footer>
  );
};
