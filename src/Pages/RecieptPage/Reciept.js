import React, { useContext } from 'react';
import '../../Styles/Reciept.css'; // CSS dosyanızın adını düzelttim
import CartContext from '../../Context/cartContext';
import { LoginContext } from '../../Context/LoginContext';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const Receipt = () => {
    const { cart, totalPrice, totalPaymentAmount, changeAmount } = useContext(CartContext);
    const {cashierName}=useContext(LoginContext);
    const {t}=useTranslation();
    const navigate=useNavigate();
  
    const handleButtonClick = () => {
        // localStorage'daki belirli değerleri silme
        localStorage.removeItem('cart');
        localStorage.removeItem('totalPaymentAmount');
        localStorage.removeItem('changeAmount');
        // İstediğiniz URL'ye yönlendirme*/
        navigate('/sales');
    };
    
    const printReceipt = () => {
        window.print(); // Tarayıcı üzerinden fişi yazdır
    };
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();


    return (
        <div>
             <button onClick={handleButtonClick} className="navigate-button">{t("new_sales")}</button>
        <div className="receipt">
        <div className="receipt-header">
            <h2>{t('receipt_header')}</h2>
        </div>
        <div className="receipt-info">
            <p>{t('date')} {currentDate}</p>
            <p>{t('time')} {currentTime}</p>
            <p>{t('cashier')} {cashierName}</p>
        </div>
        <hr/>
        <div className="receipt-items">
            <h3>{t('products')}</h3>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        <span>{item.barcode !== null ? `(${item.barcode})` : ""}{item.name}</span>
                        <span>{item.quantity } {item.barcode!==null ? t('pieces'): t('kg')} X {item.price}</span>
                        <span>{(item.quantity * item.price).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
        </div>
        <hr/>
        <div className="receipt-total">
            <h3>{t('total_amount')}</h3>
            <p>{totalPrice} $</p>
        </div>
        <hr/>
        <div className="receipt-payment">
            <h3>{t('payment_info')}</h3>
            <p>{t('paid_amount')} {totalPaymentAmount} $</p>
            <p>{t('change_amount')} {changeAmount} $</p>
        </div>
        <button onClick={printReceipt} className="print-button">{t('print_button')}</button>
    </div>
    </div>
    );
};

export default Receipt;
