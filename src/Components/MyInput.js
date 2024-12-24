import React from 'react';
import '../Styles/MyInput.css'


const MyInput = ({ label, type, id, name, value, onChange, placeholder, className, style,onKeyDown,onFocus }) => {
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <label htmlFor={id}>{label}</label>}
            <input
                type={type}
                id={id}
                name={name}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                placeholder={placeholder}
                className="input"
                style={style}
            />
        </div>
    );
};

export default MyInput;

/*using it
import './App.css';
import MyInput from './Components/MyInput';
import { useState } from 'react';


function App() {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
        ...prevData,
        [name]: value
    }));
};


  return (
    <div className="App">
         <MyInput
                label="Kullanıcı Adı:"
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
            />
            <MyInput
                label="E-posta:"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
            />
            <MyInput
                label="Şifre:"
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
            />
        
    </div>
  );
}

export default App;

*/
