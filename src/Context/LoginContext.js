// LoginContext.js
import React, { createContext, useState, useEffect, useRef } from 'react';
import {  useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';

// LoginContext'ini oluştur
export const LoginContext = createContext();

// LoginContextProvider bileşeni
export const LoginContextProvider = ({ children }) => {
  // State'ler
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [cashierName,setCashierName]=useState(
    localStorage.getItem('cashierName') || ""
  );

  const [cashiers, setCashiers] = useState([]);
  const [assignedCashier, setAssignedCashier] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [isKeyboardOpen,setIsKeyboardOpen]=useState(false);
 const [focsedInput,setFocusedInput]=useState(null);
 const [version, setVersion] = useState('');
 const navigate = useNavigate();
 
 const {t}=useTranslation();
 const logoRef = useRef(null);

    const handleKeyboardInput = (value) => {
        if(focsedInput===t('username_placeholder')){
            if (value === 'sil') {
                setUsername(prevUsername => prevUsername.slice(0, -1));
              } else {
                setUsername(prevUsername => prevUsername + value);
              }
            
        }
          if(focsedInput===t('password_placeholder')){
            if (value === 'sil') {
                setPassword(prevPassword => prevPassword.slice(0, -1));
              } else {
                setPassword(prevPassword => prevPassword + value);
              }
          }
        
    };

    const handleFocus=(e)=>{
         if(e.target.placeholder===t('username_placeholder')){
             setFocusedInput(t('username_placeholder'))
         }
         if(e.target.placeholder===t('password_placeholder')){
            setFocusedInput(t('password_placeholder'))
         }
        
         setIsKeyboardOpen(true);
    }

    useEffect(() => {
     
      if (logoRef.current) {
        logoRef.current.style.display = isKeyboardOpen ? 'none' : 'block';
      }
    }, [isKeyboardOpen]);
  
  

  // Kasiyerleri getir
  useEffect(() => {
    const fetchCashiers = () => {
      axios.get('http://localhost:3001/cashiers')
        .then((response) => {
          setCashiers(response.data);
        })
        .catch(error => {
          console.error('Hata:', error);
        });
    };
    fetchCashiers();
  }, []);

  // versiyonu getir
  useEffect(() => {
    const fetchVersion = () => {
      axios.get('http://localhost:3001/version')
        .then((response) => {
          setVersion(response.data);
        })
        .catch(error => {
          console.error('Hata:', error);
        });
    };
    fetchVersion();
  }, []);




  // Kasiyer doğrulama işlemi
  const handleLogin = (e) => {
    e.preventDefault();
    const matchedCashier = cashiers.find(cashier => cashier.cashierCode === username && cashier.password === password);
    if (matchedCashier) {
      setAssignedCashier(matchedCashier);
      setCashierName(matchedCashier.cashierName);
      localStorage.setItem('cashierName', matchedCashier.cashierName);;
      console.log('Kasa atanacak kasiyer:', matchedCashier);
      navigate("/main")
    } else {
        setShowAlert(true); // Kasiyer eşleşmediğinde alert göster
        console.log('Kasiyer kodu veya şifre yanlış.');
        setTimeout(() => {
            setShowAlert(false); // 3 saniye sonra alert'i kapat
        }, 3000);
    }
    setUsername("")
    setPassword("")

    setFocusedInput(null)
  };

  // Değerleri paylaş
  const values = {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    cashierName,
    assignedCashier,
    showAlert,
    isKeyboardOpen,
    handleFocus,
    setIsKeyboardOpen,
    handleKeyboardInput,
    logoRef,
    version
  
  };

  return (
    <LoginContext.Provider value={values}>
      {children}
    </LoginContext.Provider>
  );
};
