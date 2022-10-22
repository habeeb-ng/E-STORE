//custom hook to fetch data from api
import { useState, useEffect } from "react";

export default function useFetchProduct(url) {
    const fake = "https://fakestoreapi.com/products";
    const dummy= 'https://dummyjson.com/products'
    const [data, setData] = useState();
    const [products, setProducts] = useState();
    useEffect(() => {
    fetch(url)
        .then((res) => {
        return res.json();
      })
      .then((res) => {
          setData(res.products);
          setProducts(res);
      })
    .catch(err => {
      console.log(err.message)
    })             
    }, [url])
    return {data, products}
    
}