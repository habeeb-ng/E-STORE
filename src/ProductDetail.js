import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useFetchProduct from "./useFetchProduct";
import './productDetail.css';
import handleAddToCart from "./handleAddToCart";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "./features/cartSlice";

function ProductDetail() {
    const { id } = useParams(); // the id is coming from the name we gave in its route from app.js file
  const { products: currentProduct } = useFetchProduct(`https://dummyjson.com/products/${id}`);
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
      
  const images = currentProduct && currentProduct.images;
 
  const [selectedImage, setSelectedImage] = useState(); 
  const handleImagView = (image) => {
    setSelectedImage(image);
    // selectedImage === image ? objevent.target.classList.add("active") : objevent.target.classList.remove("active");
  }
  return (
    <div className="productDetail">
      {currentProduct && 
        <div className="productDetail__container">
          <div className="productDetail__images">
            <img src={selectedImage? selectedImage : currentProduct.thumbnail } alt={currentProduct.title} className="displayImage" />
            <div className="imageOptions"  >
              {images && images.map((image, index) => {
                return (
                  <div className={`indImg ${selectedImage === image ? "currentView" : ""}`} key={index}>
                    <img  onClick={()=>handleImagView(image)}  src={image } />
                  </div>
                  
                  
                  )})}
            </div >
          </div>
          <div className="productDetail__info">
            <div className="productDetail__description">
              <div className="nameAndBrand">
                <h1>{currentProduct.title}</h1>
                <span>brand: {currentProduct.brand}</span>
              </div>
              
              <p>{currentProduct.description}</p>
              
            </div>
            
            <div className="productDetail__checkoutOption">
              <h3>Price: ${currentProduct.price}</h3>
              <p>{currentProduct.stock} available</p>
              <div className="productDetail__actionButtons">
                <button onClick={()=>{handleAddToCart(currentProduct, user, dispatch, navigate)}}>Add to Cart</button>
                <button onClick={()=>{ navigate("/checkoutPage")}}>
                  <Link to=".">Checkout Now</Link>
                </button>
              </div>
            </div>

            
          </div>
          
          
          

        </div>
      }
    </div>
  )
}

export default ProductDetail; 