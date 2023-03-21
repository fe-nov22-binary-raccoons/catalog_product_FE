import './NotFoundPage.scss';

export const PageNotFound: React.FC = () => (
  <div className="not-found-page container">
    <div className="row">
      <div className="col-24 ">
        <h1 className="heading-2">Page not found</h1>
      </div>

      <a href="#/">
        <div className="buttons_buy-btn back_home-btn reload-btn">
          Back to Home
        </div>
      </a>
    </div>
  </div>
);
