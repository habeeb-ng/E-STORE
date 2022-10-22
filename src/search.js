
function filter(products,searchKey){

    if (searchKey) {
      let searchResult = products.filter((product) => {
        if (product.title.toLowerCase().includes(searchKey.toLowerCase())
          || product.description.toLowerCase().includes(searchKey.toLowerCase())
          || product.brand.toLowerCase().includes(searchKey.toLowerCase())
          || product.category.toLowerCase().includes(searchKey.toLowerCase())) {
          
            return true;
          } else {
            return false
          } 
          
      })
      console.log(searchResult)
        return searchResult;
      } else {
        return false
    }
}
  
export default filter;