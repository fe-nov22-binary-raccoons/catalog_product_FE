import chevron from '../../../images/footer/chevron-top.svg';

export const BackToTopIcon: React.FC = () => (
  <a className="icon" href="#top">
    <div className="icon__tooltip">
      <a className="icon__link" href="">
        Back to top
      </a>
    </div>
    <img className="icon__chevron" src={chevron} />
  </a>
);
