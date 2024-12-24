import React, { useEffect, useState } from "react";
const elements = document.querySelectorAll('*');



const MyContext = React.createContext();

export const MyProvider = (props) => {

    const currentHour = new Date().getHours();
    const isStoreOnline = currentHour >2  && currentHour < 24;
    const [theme, setTheme] = useState('light');
    const [Path, setPath] = useState(null);
    

    useEffect(()=>{
      elements.forEach(element => {
        element.classList.toggle('light-theme');
      });
  
    },[])

    const toggleTheme = () => {
      setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
    
      elements.forEach(element => {
        element.classList.toggle('dark-theme');
      });
    };

    
  
    const [currentLanguage, setCurrentLanguage] = useState('EN');
    const [showEmailAlert,setShowEmailAlert]=useState(false);

  const languages = {
    EN: ['1234567890*', 'QWERTYUIOP@', 'ASDFGHJKL', 'ZXCVBNM'],
    TR: ['1234567890*', 'FJÖIDYLEÜ@', 'AŞGHRNPKO', 'ZXCVBNM'],
    JP: ['1234567890*', 'あいうえお@', 'かきくけこ', 'さしすせそ'],
    FR: ['1234567890*', 'AZERTYUIOP@', 'QSDFGHJKLM', 'WXCVBN'],
    AR: ['١٢٣٤٥٦٧٨٩٠*', 'ضصثقفغعهخحج', 'شسيبلاتنمك', 'ئءؤرﺍذد؛/'],
  };



    return (
        <MyContext.Provider value={{ isStoreOnline,theme,toggleTheme,currentLanguage,languages,setCurrentLanguage,showEmailAlert,setShowEmailAlert,Path,setPath, }}>
            {props.children}
        </MyContext.Provider>
    )


}

export default MyContext;

