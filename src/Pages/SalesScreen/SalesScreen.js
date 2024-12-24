import Cart from "./Cart";
import Functions from "./Functions";
import Products from "./Products";
import '../../Styles/SalesScreen.css'
import { CartProvider } from "../../Context/cartContext";
import { ProductsProvider } from "../../Context/ProuductsContext";
import { useNavigate } from "react-router-dom";
import MyContext from "../../Context/Context";
import { useContext } from "react";
import { useTranslation } from "react-i18next";



const SalesScreen = () => {

    const {Path}=useContext(MyContext);
    const navigate=useNavigate();
    const {t}=useTranslation();
    const handleGoBack = () => {
        if (Path) {
          navigate(Path);
        } else {
          navigate("/main")
        }
      }
    
     
    
    
    return (
      
        <div className="sales-screen-container">
              <button onClick={handleGoBack} className="navigate-button">{t("Back")}</button>
              <ProductsProvider>
            <CartProvider>
            <div className="sales-screen-column">
            
                <Products />
            </div>
            <div className="sales-screen-column">
                <Cart />
            </div>
            <div className="sales-screen-column">
                <Functions />
            </div>
            </CartProvider>
            </ProductsProvider>
        </div>
       
    );
};

export default SalesScreen;