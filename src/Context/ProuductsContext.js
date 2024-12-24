import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
   

  
    useEffect(() => {
      const fetchProducts = () => {
        axios.get('http://localhost:3001/products')
          .then((response) => {
            const prod=response.data;
            let newProd=[]
            for(let i=0;i<25;i++){
              newProd=[...newProd,...prod]
            }
            setProducts(newProd);
          })
          .catch(error => {
            console.error('Hata:', error);
          })
      };
  
      const fetchCategories = () => {
        axios.get('http://localhost:3001/categories')
          .then((response) => {
            const cat=response.data;
            let newCat=[];
            for(let i=0;i<25;i++){
              newCat=[...newCat,...cat]
            }
            setCategories(newCat);
          })
          .catch(error => {
            console.error('Hata:', error);
          })
      };
    
  
      fetchProducts();
      fetchCategories();
     
    }, [products,categories]);

   

  



  return (
    <ProductsContext.Provider
      value={{products,categories }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
