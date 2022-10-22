import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import AllProduct from './AllProduct';
import handleAddToCart from './handleAddToCart';
import Product from './Product';
import filter from './search';


function Filtered({ products, searchKey }) {
   const user = useSelector(state => state.user.user);
  const cart = useSelector(state => state.cart.cart);
  const [searchResult, setSearchResult] = useState(null)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setSearchResult(filter(products, searchKey));
    // !searchResult.length && navigate("/")
  }, [searchKey])
  
  if (searchResult && searchResult.length) {
    return (
      <div className="Filtered">
       
      {products && 
        <div className="searchResult">
          {(searchResult.map((prod) => {
            return (
              <div className="products" key ={prod.id}>
                        <Product
                            id={prod.id}
                            title={prod.title} 
                            price={prod.price}
                            image={prod.thumbnail}
                            rating={prod.rating}
                    />
                <button onClick={() => { handleAddToCart(prod, user, dispatch, navigate) }}>Add to cart</button>
              </div>
        )
          }))}
        </div>
      }
    </div>
    )
  } 
  return (
    <div>
      <p>{ searchKey} does not match any of our product</p>
    </div>
  )

  
    
  // return (
  //   <div className="Filtered">
       
  //     {products && 
  //       <div className="searchResult">
  //         {searchResult ? (searchResult.map((prod) => {
  //           return (
  //             <div className="products" key ={prod.id}>
  //                       <Product
  //                           id={prod.id}
  //                           title={prod.title} 
  //                           price={prod.price}
  //                           image={prod.thumbnail}
  //                           rating={prod.rating}
  //                   />
  //               <button onClick={() => { handleAddToCart(prod, user, dispatch, navigate) }}>Add to cart</button>
  //             </div>
  //       )
  //         })):(
  //           {
              
  //           }
  //         )}
  //       </div>
  //     }
  //   </div>
  // )
}

export default Filtered