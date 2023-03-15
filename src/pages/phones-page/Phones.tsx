import React from 'react';
import '../page-grid.scss';

export const Phones: React.FC = () => {
  return <div className="Phones">
    <div className="container">
      <div className="row">
        <div className="col-24">Phones (Breadcrumbs)</div>
      </div>
      <div className="row">
        <div className="col-24">Mobile phones (Header)</div>
      </div>
      <div className="row">
        <div className="col-24">
          <h1>Header</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-4">Sort By</div>
        <div className="col-3">Items on page</div>
      </div>
    </div>
    <div className="container">
      <div className="row gy-4">
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
        <div className="col-xl-6 col-lg-8 col-md-12 col-sm-24">
          <div className="card">Mobile phone</div>
        </div>
      </div>
    </div>
  </div>;
};
