import underConstruction from '../../images/under-construction.png';

export const TabletsPage: React.FC = () => (
  <div className="home-page container">
    <div className="row">
      <h1 className="heading-1 col-24" style={{ marginBottom: '60px' }}>
        Tablets Page
      </h1>
      <img
        className="col-18"
        src={underConstruction}
        alt="under-construction"
      />
    </div>
  </div>
);
