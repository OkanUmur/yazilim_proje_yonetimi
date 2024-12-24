import MyButton from '../../Components/MyButton';
import CartContext from '../../Context/cartContext';
import { useContext } from 'react';
import '../../Styles/Product.css';
import { useTranslation } from 'react-i18next';

const Product = ({ id,name, category, price, stock,barcode, image }) => {
  const { cart ,setCart} = useContext(CartContext);
  const {t}=useTranslation();

  

  const handleAddToCart = () => {
       // Sepete eklenen ürünün mevcut olup olmadığını kontrol et
       const existingProductIndex = cart.findIndex(item => item.id === id);
      

       if (existingProductIndex !== -1) {
         // Eğer ürün sepete eklenmişse, sadece ürünün adedini arttır
         const updatedCart = [...cart];
         updatedCart[existingProductIndex].quantity += 1;
         setCart(updatedCart);
       } else {
         // Eğer ürün henüz sepete eklenmemişse, yeni bir ürün olarak ekle
         const newProduct = { id, name, price, barcode,category,quantity: 1 };
      
         setCart([...cart, newProduct]);
       }
  }
    return (

      <div className="product">
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <p className='category'>{t('product_category')}: {category}</p>
      <p className='price'>{t('product_price')}: ${price}</p>
      <p className='stock'>{t('product_stock')}: {stock} {barcode === null ? t('product_kg') : t('product_unit')}</p>
      <MyButton fullWidth onClick={handleAddToCart}>{t('product_add_to_cart')}</MyButton>
    </div>
    );
  };

export default Product;