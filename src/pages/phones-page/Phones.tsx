import React from 'react';
import '../page-grid.scss';
import './Phones.scss';
import phones from './phones.json';
import { PhoneCard } from '../../components/PhoneCard';

export const Phones: React.FC = () => {
  return <div className="phones">
    {/* <Header /> */}
    <div className="container">
      <div className="row">
        <div className="col-24 breadcrumbs">Phones (Breadcrumbs)</div>
      </div>
      <div className="row">
        <div className="col-24">
          <h1 className="heading-1">Mobile phones</h1>
          <p className="subtitle">95 models</p>
        </div>
      </div>
      <div className="row phones-filters">
        <div className="col-4">Sort By</div>
        <div className="col-3">Items on page</div>
      </div>
    </div>
    <div className="container">
      <div className="row gy-4">
        {phones.map(phone => (
          <PhoneCard phone={phone} key={phone.id} />
        ))}
      </div>
    </div>
  </div>;
};
