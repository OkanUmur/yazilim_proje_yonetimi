import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../Context/LoginContext";
import '../../Styles/Reciept.css';
import { useTranslation } from "react-i18next";

const ReturnReceipt = () => {
  let { id } = useParams();

  const [productsForReturn, setProductsForReturn] = useState([]);
  const { cashierName } = useContext(LoginContext);
  const {t}=useTranslation();

  useEffect(() => {
    const fetchProducts = () => {
      axios
        .get(`http://localhost:3001/returnOrders/${id}`)
        .then((response) => {
          setProductsForReturn(response.data.products);
        })
        .catch((error) => {
          console.error("Hata:", error);
        });
    };
    fetchProducts();
  }, [id]);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    productsForReturn.forEach((product) => {
      totalPrice += product.quantity * product.price; // Miktarı ile çarpılmış fiyatı topla
    });
    return totalPrice;
  };

  const navigate=useNavigate();
  
  const handleButtonClick = () => {
      // localStorage'daki belirli değerleri silme
      localStorage.removeItem('cart');
      localStorage.removeItem('totalPaymentAmount');
      localStorage.removeItem('changeAmount');
      // İstediğiniz URL'ye yönlendirme*/
      navigate('/sales');
  };
  

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString();
  const currentTime = new Date().toLocaleTimeString();
  const totalPrice = calculateTotalPrice();

  return (
    <div>
        <button onClick={handleButtonClick} className="navigate-button">{t("new_sales")}</button>
    <div className="receipt">
      <div className="receipt-header">
        <h2>{t('receipt_header')}</h2>
      </div>
      <div className="receipt-info">
        <p>{t('date')}: {currentDate}</p>
        <p>{t('time')}: {currentTime}</p>
        <p>{t('cashier')}: {cashierName}</p>
      </div>
      <hr/>
      <div className="receipt-items">
        <h3>{t('products')}</h3>
        <ul>
          {productsForReturn.map((item, index) => (
            <li key={index}>
              <span>({item.barcode}){item.name}</span>
              <span>{item.quantity} X {item.price}</span>
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
        <p>{t('returned_amount')}: {totalPrice} $</p>
      </div>
      <button onClick={handlePrint} className="print-button">{t('print_button')}</button>
    </div>
    </div>
  );
};

export default ReturnReceipt;
