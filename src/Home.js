import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Product from './Product';
import AllProduct from './AllProduct';
import useFetchProduct from "./useFetchProduct";
import filter from './search';

function Home({products}) {
  // const { data: products } = useFetchProduct("https://dummyjson.com/products");

  return (
    <div className="home">
      <div className="home__head">
        <h1>GREAT DEALS &amp; AND FAST SHIPPING </h1>
      </div>
      {/* <div className="products_container"> */}
      {products && <AllProduct products={products} />}
        
      {/* </div> */}
      
    </div>
  )
}
export default Home;