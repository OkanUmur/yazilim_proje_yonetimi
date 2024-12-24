import React, { useContext, useEffect, useState } from 'react';
import MyButton from '../../Components/MyButton';
import CartContext from '../../Context/cartContext';
import { Link } from 'react-router-dom';
import MyAlertify from '../../Components/MyAlertify';
import { useTranslation } from 'react-i18next';

const Functions = () => {
  const { cart,removeCart, deleteFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const [goPayment,setGoPayment]=useState(false);
  const [showAlert,setShowAlert]=useState(false);
  const {t}=useTranslation();

  useEffect(()=>{
        if(cart.length>=1){
              setGoPayment(true);
        }
        if(showAlert){
          setTimeout(() => {
            setShowAlert(false)
        }, 4000);
        }
       
  },[cart,showAlert])


  const handleIncreaseQuantity = () => {
    increaseQuantity();
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantity();
  };

  const handleDeleteRow = () => {
    deleteFromCart();
  };

  const handleClearCart = () => {
    removeCart();
  };

  const handleProceedToPayment = () => {

    if(goPayment===false){
      setShowAlert(true)
    }
    
  };

  return (
   
    cart.length > 0 ? (
      <div>
        <h1>{t('functions_title')}</h1>
        <div>
          <MyButton fullWidth variant='primary' onClick={handleIncreaseQuantity}>{t('increase_quantity')}</MyButton>
          <MyButton fullWidth variant='secondary' onClick={handleDecreaseQuantity}>{t('decrease_quantity')}</MyButton>
          <MyButton fullWidth variant='primary' onClick={handleDeleteRow}>{t('delete_row')}</MyButton>
          <MyButton fullWidth variant='secondary' onClick={handleClearCart}>{t('clear_cart')}</MyButton>
          <Link onClick={handleProceedToPayment} to={goPayment ? `/payment` : `#`}>
            <MyButton fullWidth variant='primary'>{t('proceed_to_payment')}</MyButton>
          </Link>
          {
            showAlert &&
            <MyAlertify variant="error">
              {t('cart_empty_alert')}
            </MyAlertify>
          }
        </div>
      </div>
    ) : <div></div>

    
  );
};

export default Functions;
