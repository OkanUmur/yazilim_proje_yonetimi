import React, { useContext, useEffect } from "react";
import '../../Styles/Payment.css'
import CartContext from "../../Context/cartContext";
import MyButton from "../../Components/MyButton";
import CampaignModal from "./CampaignModal";
import {useNavigate} from 'react-router-dom';
import { useTranslation } from "react-i18next";

const Payment = () => {
    const { cart,totalPrice, removeCart, deleteFromCart, paymentType, handlePaymentTypeChange, paymentAmount, handlePaymentAmountChange, handleNumberClick, remainingAmount,handleCampingnsClick, filteredCampaigns,showModal } = useContext(CartContext);
  
    const navigate=useNavigate();
    const {t}=useTranslation();

    useEffect(()=>{
       if(cart.length<1){
         navigate("/sales")
       }
    },[cart,navigate])


    return (
        <div className="payment-container">
        <div>
            {showModal && (
                <CampaignModal filteredCampaigns={filteredCampaigns} />
            )}
        </div>
        <div>
            <MyButton fullWidth variant='primary' onClick={() => deleteFromCart()}>{t('delete_row')}</MyButton>
            <MyButton fullWidth variant='secondary' onClick={() => removeCart()}>{t('cancel_document')}</MyButton>
            <MyButton fullWidth variant="primary" onClick={() => handleCampingnsClick()}>{t('campaign')}</MyButton>
        </div>
        <div>
            <h2>{t('payment_method')}</h2>
            <MyButton className={paymentType === "cash" ? "active" : ""} onClick={() => handlePaymentTypeChange("cash")}>{t('cash')}</MyButton>
            <MyButton className={paymentType === "credit" ? "active" : ""} onClick={() => handlePaymentTypeChange("credit")}>{t('credit_card')}</MyButton>
        </div>
        <div>
            <div>
                <input className="payment-input" type="text" value={paymentAmount} onChange={handlePaymentAmountChange} />
                <div className="number-buttons">
                    {[...Array(10).keys()].map((number) => (
                        <button key={number} className="number-button" onClick={() => handleNumberClick(number)}>{number}</button>
                    ))}
                    <button className="number-button" onClick={() => handleNumberClick(".")}>.</button>
                </div>
            </div>
        </div>
        <div className="payment-details">
            <h2>{t('total_to_pay')}</h2>
            <p>{totalPrice} $</p>
            <h2>{t('remaining_amount')}</h2>
            <p className="change">{remainingAmount}$</p>
        </div>
    </div>
    );
};

export default Payment;
