import React,{ useContext } from "react";
import CartContext from "../../Context/cartContext";
import '../../Styles/Cart.css'
import { useTranslation } from "react-i18next";

const Cart=()=>{

    const { cart, selectedItem, totalPrice,subPrice, setSelectedItem } = useContext(
        CartContext
      );
      const {t}=useTranslation();

    
      const handleItemClick = (index) => {
        setSelectedItem(index);
      };


    return(
        <div className="cart-container">
      <h1 className="cart-header">{t('cart_header')}</h1>
      {cart.length === 0 ? (
        <div className="cart-empty-message">{t('cart_empty_message')}</div>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th>{t('product')}</th>
              <th>{t('price')}</th>
              <th>{t('quantity')}</th>
          
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr
                key={index}
                className={
                  index === selectedItem ? "cart-item selected" : "cart-item"
                }
                onClick={() => handleItemClick(index)}
              >
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  {item.quantity} {item.barcode === null ? t('kg') : t('piece')}
                
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {cart.length > 0 && (
        <div className="cart-total">
          <div className="subtotal">
            <span>{t('subtotal')}:</span>
            <span>${subPrice}</span>
          </div>
          <div className="total">
            <span>{t('total')}:</span>
            <span>${totalPrice}</span>
          </div>
        </div>
      )}
    </div>
    )
}

export default Cart;