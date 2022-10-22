import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Product.css';
import StarIcon from '@mui/icons-material/Star';

function Product({ id, title, price, image, rating }) {
  const [rate] = useState(Math.floor(rating));
  return (
    <div className='product'>
          
          <Link to={`/product/${id}`}>
            <img src={image} alt={title} />
            <div className="product__info">
                <span>{title}</span>
                <span> ${price}</span>
            </div>
            <div className="rating">
              {Array(rate).fill().map((_, i)=> <StarIcon/> )}
            </div>
            </Link>
     </div>
  )
}

export default Product