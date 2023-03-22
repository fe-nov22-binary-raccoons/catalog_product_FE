import { NavLink } from 'react-router-dom';
import './PageNotReady.scss';

export const PageNotReady: React.FC = () => (
  <div className="home-page container">
    <div className="row">
      <div className="col-24">
        <div className="notfound-holyStars">Святі небеса</div>
        <div className="notfound-error">404</div>
        <div className="notfound-pageParagraph">
          Сторінка, яку ви шукали, ще не готова
        </div>
        <div className="notfound-pageParagraph">
          мабуть її, ще не зробили єноти
        </div>

        <div className="notfound-backPage">
          <p className="notfound-backParagraph">
            Поверніться&nbsp;
            <NavLink to="/" className="notfound-back">
              назад
            </NavLink>
            &nbsp;звідки ви прийшли,
            <br />і дайте єнотам трошки часу
          </p>
        </div>
      </div>
    </div>
  </div>
);
