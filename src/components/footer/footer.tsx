import './footer.scss';
import '../../index.scss';
import { Logo } from './logo/logo';
import { BackToTopIcon } from './icon/backToTopIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__block">
        <Logo />
        <nav className="footer__nav">
          <ul className="footer__nav__block">
            <li className="footer__nav__item">
              <a className="footer__nav__link" href="">
                github
              </a>
            </li>
            <li className="footer__nav__item">
              <a className="footer__nav__link" href="">
                contacts
              </a>
            </li>
            <li className="footer__nav__item">
              <a className="footer__nav__link" href="">
                rights
              </a>
            </li>
          </ul>
        </nav>

        <BackToTopIcon />
      </div>
    </footer>
  );
};
