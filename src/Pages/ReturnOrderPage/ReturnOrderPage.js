import Barcode from "../SalesScreen/Barcode";
import MyButton from "../../Components/MyButton";
import { useReturn } from "../../Context/ReturnContext";
import "../../Styles/ReturnOrderPage.css"; 
import { useTranslation } from "react-i18next";

const ReturnOrderPage = () => {
  const { t } = useTranslation();
  const { productsForReturn, handleReturn, handleReturnOrders } = useReturn();

  return (
    <div className="return-order-page">
      <h1>{t('return_order_page_title')}</h1>
      <p>{t('scan_barcode_instruction')}</p>
      <Barcode onScan={handleReturn} />
      <div className="return-products">
        <ul className="product-list">
          {productsForReturn.map((product) => (
            <li key={product.id} className="product-item">
              <img src={product.image} alt={product.name} />
              <div>
                <h3>{t('product_name')} {product.name}</h3>
                <p>{t('category')} {product.category}</p>
                <p>{t('price')} {product.price} $</p>
                <p>{t('quantity')} {product.quantity}</p>
                <p>{t('barcode')} {product.barcode}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {
        productsForReturn.length >= 1 && (
          <MyButton variant="secondary" onClick={handleReturnOrders} style={{ width: '50%' }} >
            {t('return_button_text')}
          </MyButton>
        )
      }

    </div>
  );
};

export default ReturnOrderPage;
