import { BreadCrumbs } from '../../components/BreadCrumbs';
import { UnderConstruction } from '../UnderConstruction';

export const AccessoriesPage: React.FC = () => (
  <div className="home-page container">
    <BreadCrumbs />
    <div className="row">
      <h1 className="heading-1 col-24" style={{ marginBottom: '60px' }}>
        Accessories Page
      </h1>

      <UnderConstruction />
    </div>
  </div>
);
