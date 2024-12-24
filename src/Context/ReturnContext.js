// ReturnContext.js

import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';

const ReturnContext = createContext();

export const useReturn = () => {
  return useContext(ReturnContext);
};

export const ReturnProvider = ({ children }) => {
  const [productsForReturn, setProductsForReturn] = useState([]);

 

  const handleReturn = (product) => {
      // Eğer aynı ID'ye sahip bir ürün zaten varsa miktarını arttır
      const existingProductIndex = productsForReturn.findIndex(
        (p) => p.id === product.id
      );
      if (existingProductIndex !== -1) {
        const updatedProducts = [...productsForReturn];
        updatedProducts[existingProductIndex].quantity += 1;
        setProductsForReturn(updatedProducts);
      } else {
        // Eğer ürün yoksa yeni ürün olarak ekle
        const returnedProduct = {
          ...product,
          returnedAt: new Date().toISOString(),
          quantity: 1, // İade edilen ürünlerin varsayılan miktarı 1 olarak ayarlanabilir
        };
        setProductsForReturn([...productsForReturn, returnedProduct]);
      }
  
  };

  const handleReturnOrders = () => {
            
    const requestData = {
      products: productsForReturn,
    };
  
   
    axios.post('http://localhost:3001/returnOrders', requestData)
      .then(response => {
    
        setProductsForReturn([]);
        window.location.href=`/returnreciept/${response.data.id}`
      })
      .catch(error => {
        console.error('İade işlemi gerçekleştirilemedi:', error);
       
        alert('İade işlemi gerçekleştirilemedi. Lütfen tekrar deneyin.');
      });
  };

  return (
    <ReturnContext.Provider value={{productsForReturn,  handleReturn, handleReturnOrders }}>
      {children}
    </ReturnContext.Provider>
  );
};

export default ReturnContext;
