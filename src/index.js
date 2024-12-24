import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { MyProvider } from './Context/Context';
import { BrowserRouter } from 'react-router-dom';
import { LoginContextProvider } from './Context/LoginContext';
import { CartProvider } from './Context/cartContext';
import { ProductsProvider } from './Context/ProuductsContext';
import { ReturnProvider } from './Context/ReturnContext';
import i18n from './i18n';


library.add(fas);




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <MyProvider>
      <ProductsProvider>
      <LoginContextProvider>
        <CartProvider>
          <ReturnProvider>
          <App />
          </ReturnProvider>
        </CartProvider>
      </LoginContextProvider>
      </ProductsProvider>
    </MyProvider>
  </BrowserRouter>
);

