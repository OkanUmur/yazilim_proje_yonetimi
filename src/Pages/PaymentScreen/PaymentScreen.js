import React, { useContext } from "react";
import Cart from "./Cart";
import Processes from "./Processes";
import Payment from "./Payment";
import { CartProvider } from "../../Context/cartContext";
import { Alert } from "@mui/material";
import MyContext from "../../Context/Context";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";




const PaymentScreen = () => {

  const {showEmailAlert,Path}=useContext(MyContext);
   const {t}=useTranslation();
   const navigate=useNavigate();


   
  const handleGoBack = () => {
    if (Path) {
      navigate(Path);
    } else {
      navigate("/sales")
    }
  }

   
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <button onClick={handleGoBack} className="navigate-button">{t("Back")}</button>
      <CartProvider>
       

      
       
      <div style={{ flex: 1,margin:"12px" }}>
      {
          showEmailAlert ?(
            <Alert severity="success">{t('payment_success_message')}</Alert>
        

          ):(<div></div>)
        }
        
        <Processes />
      </div>

      <div style={{ flex: 1 }}>
        <Cart />
      </div>
      <div style={{ flex: 1 }}>
        <Payment />
      </div>
    
   
      </CartProvider>
    </div>
  );
};

export default PaymentScreen;
