import React, { useContext, useState } from "react";
import MyInput from "../../Components/MyInput";
import ProductsContext from "../../Context/ProuductsContext";
import CartContext from "../../Context/cartContext";
import { useTranslation } from "react-i18next";

const Barcode = ({onScan}) => {
  const [barcode, setBarcode] = useState("");
  const { products } = useContext(ProductsContext);
  const {t}=useTranslation();
  
  const { cart ,setCart} = useContext(CartContext);

  const handleAddToCart = (matched) => {
    // Sepete eklenen ürünün mevcut olup olmadığını kontrol et
    const existingProductIndex = cart.findIndex(item => item.id === matched.id);

    if (existingProductIndex !== -1) {
      // Eğer ürün sepete eklenmişse, sadece ürünün adedini arttır
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      // Eğer ürün henüz sepete eklenmemişse, yeni bir ürün olarak ekle
      const newProduct = { id:matched.id, name:matched.name, price:matched.price,barcode:matched.barcode,category:matched.category, quantity: 1 };
      setCart([...cart, newProduct]);
    }
    playSuccessSound();
}
const playSuccessSound = () => {
    const audioElement = document.getElementById('success-sound');
    if (audioElement) {
      audioElement.play();
    }
  };

  const handleKeyDown = (event) => {

    if (event.key === "Enter") {
        

     

      // Ürünleri tarayıp, girdiğiniz barkod numarasıyla eşleşen ürünü bul
      const matched = products.find((product) => product.barcode === barcode);
      if (matched) {
        if(onScan==="addtocart"){
          handleAddToCart(matched)
        }
        else{
          onScan(matched)
        }

        
      } else {
        console.log("Eşleşen ürün bulunamadı");
        // Eşleşen bir ürün bulunamazsa, matchedProduct state'ini sıfırlayın
        
      }

      // Barkodun sıfırlanması için
      setBarcode("");
    }
  };

  const handleChange = (event) => {
    let input = event.target.value;
    // Karakter sınırını kontrol et
    if (input.length > 13) {
      // 13 karakterden fazlaysa, sadece ilk 13 karakteri al
      input = input.slice(0, 13);
    }
    // Barkod numarasını güncelle
    setBarcode(input);
  };

  return (
    <div>
      <MyInput
        type="text"
        name="barcode"
        value={barcode}
        onKeyDown={handleKeyDown}
        placeholder={t('read_barcode')}
        onChange={handleChange}
      />

      <audio id="success-sound" src="/Sounds/achive-sound-132273.mp3" ></audio>

  
    </div>
  );
};

export default Barcode;
