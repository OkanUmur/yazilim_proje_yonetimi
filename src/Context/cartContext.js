import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'



const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || [] );
  const [selectedItem, setSelectedItem] = useState(-1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [subPrice, setSubPrice] = useState(0);
  const [paymentAmount, setPaymentAmount] = useState(0);
  let [totalPaymentAmount,setTotalPaymentAmount]=useState(localStorage.getItem("totalPaymentAmount") ||0);
  const [paymentType, setPaymentType] = useState(null);
  const [remainingAmount, setRemainingAmount] = useState(totalPrice);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [changeAmount, setChangeAmount] = useState(
    localStorage.getItem("changeAmount") || 0
  );
  const [campaigns, setCampaings] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState(null);
  const [showModal, setShowModal] = useState(false);
  

  // Kampanyaları getir
  useEffect(() => {
    const fetchCampaings = () => {
      axios.get('http://localhost:3001/campaigns')
        .then((response) => {
          setCampaings(response.data);
        })
        .catch(error => {
          console.error('Hata:', error);
        });
    };
    fetchCampaings();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) {
      // Eğer cart verisi yoksa, boş bir array ile oluştur
      localStorage.setItem("cart", JSON.stringify([]));
    } else {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Cart güncellendiğinde local storage'a kaydet
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("totalPaymentAmount", totalPaymentAmount);
  
    
  }, [totalPaymentAmount]);
  
  
  
  

  // changeAmount değerini local storage'dan al
  useEffect(() => {
    localStorage.setItem("changeAmount", changeAmount);
  }, [changeAmount]);

  useEffect(() => {

    const newSubPrice = cart.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);


    let newTotalPrice = 0;
    

    cart.forEach(item => {
      let discountedPrice = item.price;
      
      campaigns.forEach(campaign => {
        
       
        if (campaign.applicableProducts && campaign.applicableProducts.includes(item.id)) {
          
          discountedPrice *= (1 - campaign.discountRate);
        } else if (campaign.applicableCategories && campaign.applicableCategories.includes(item.category)) {
          
          discountedPrice *= (1 - campaign.discountRate);
        }
      });
      // Her ürünün indirimli fiyatını totalPrice'a ekle
      newTotalPrice += discountedPrice * item.quantity;
    });
    setTotalPrice(parseFloat(newTotalPrice).toFixed(2));
    setSubPrice(parseFloat(newSubPrice).toFixed(2));
    setRemainingAmount(parseFloat(newTotalPrice).toFixed(2));

  }, [cart, campaigns]);

  const increaseQuantity = () => {
    if (selectedItem !== -1) {
      const newCart = [...cart];
      newCart[selectedItem].quantity++;
      setCart(newCart);
    }

  };

  const decreaseQuantity = () => {
    if (selectedItem !== -1) {
      const newCart = [...cart];
      if (newCart[selectedItem].quantity > 1) {
        newCart[selectedItem].quantity--;
        setCart(newCart);
      }
    }

  };

  const deleteFromCart = () => {
    const newCart = cart.filter((item, i) => i !== selectedItem);
    setCart(newCart);
    setSelectedItem(-1);
  };

  const removeCart = () => {
    setCart([]);
    setSelectedItem(-1);
    setChangeAmount(0.00);
    setTotalPaymentAmount(0.00);
  }
  const handleCampingnsClick = () => {
    if (selectedItem !== -1){
      const selectedProduct = cart[selectedItem];

      // Seçili öğenin ID'sine göre kampanyaları filtrele
      setFilteredCampaigns(
        campaigns.filter(campaign => {
          return (
            (campaign.applicableProducts && campaign.applicableProducts.includes(selectedProduct.id)) ||
            (campaign.applicableCategories && campaign.applicableCategories.includes(selectedProduct.category))
          );
        })
      )
      setShowModal(true);
    }
      
    
    

  }

  const closeModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setRemainingAmount(parseFloat(totalPrice).toFixed(2));
  }, [totalPrice])

 
  
  const handlePaymentTypeChange = (type) => {
    
    
      setPaymentType(type);
      makePayment();

  };

  const handleNumberClick = (number) => {
    let value=paymentAmount.toString()+number.toString();
      setPaymentAmount(Number(value));
  };

  const handlePaymentAmountChange = (event) => {
    setPaymentAmount(event.target.value);
  };
  


  useEffect(() => {

    if (paymentComplete) {
      window.location.href = "/reciept"
      

    }


  }, [paymentComplete, changeAmount]);

  const makePayment = () => {
    let payment = parseFloat(paymentAmount);
    let newTotalPaymentAmount = parseFloat(totalPaymentAmount) + payment;
    setTotalPaymentAmount(newTotalPaymentAmount.toFixed(2));
  
    let remaining = remainingAmount - payment;
  
    // Kalan tutarın 0'dan küçük olmamasını sağla
    if (remaining < 0) {
      remaining = 0;
    }
    setRemainingAmount(remaining.toFixed(2));
  
    // Para üstünü hesapla
    let change = 0;
    if (newTotalPaymentAmount >= totalPrice) {
      change = newTotalPaymentAmount - totalPrice;
    }


  
    // Ödeme tamamlandıysa işaretle
    if (remaining === 0) {
      setPaymentComplete(true);
    }
  
    setChangeAmount(change.toFixed(2));
  };
  





  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        selectedItem,
        addToCart,
        deleteFromCart,
        totalPrice,
        subPrice,
        setSelectedItem,
        removeCart,
        increaseQuantity,
        decreaseQuantity,
        paymentAmount,
        setPaymentAmount,
        paymentType,
        setPaymentType,
        remainingAmount,
        paymentComplete,
        changeAmount,
        handlePaymentTypeChange,
        handleNumberClick,
        handlePaymentAmountChange,
        campaigns,
        handleCampingnsClick,
        filteredCampaigns,
        showModal,
        closeModal,
        totalPaymentAmount,
        setTotalPaymentAmount,
        setChangeAmount

      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
