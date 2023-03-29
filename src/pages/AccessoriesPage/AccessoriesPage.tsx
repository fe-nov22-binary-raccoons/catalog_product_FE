import { BreadCrumbs } from '../../components/BreadCrumbs';
import { UnderConstruction } from '../UnderConstruction';

// import underConstruction from '../../images/under-construction.png';
export const AccessoriesPage: React.FC = () => (
  <div className="home-page container">
    <BreadCrumbs />
    <div className="row">
      <h1 className="heading-1 col-24" style={{ marginBottom: '60px' }}>
        Accessories Page
      </h1>
      {/* <img
        className="col-18"
        src={underConstruction}
        alt="under-construction"
      /> */}

      <UnderConstruction />
    </div>
  </div>
);
