import { Link } from 'react-router-dom';
import './CategoryCard.scss';

type Props = {
  name: string;
  itemsCount: number;
  img: string;
  path: string;
  backgroundColor: string;
};

export const CategoryCard: React.FC<Props> = ({
  name,
  itemsCount,
  img,
  path,
  backgroundColor,
}) => {
  return (
    <div className="col-lg-8 col-md-8 col-sm-24 category-card">
      <Link
        className="category-card_image-link"
        to={`/${path}`}
        style={{ backgroundColor: backgroundColor || '#89939a' }}
      >
        <img className="category-card_image" src={img} alt={name} />
      </Link>
      <Link className="category-card_title-link" to={`/${path}`}>
        <h4 className="heading-4">{name}</h4>
      </Link>
      <p className="category-card_subtitle">{`${itemsCount} models`}</p>
    </div>
  );
};
