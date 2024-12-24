// Button.js
import React from 'react';

const MyButton = ({
    onClick,
    children,
    variant = 'default',
    size = 'medium',
    disabled = false,
    fullWidth = false,
    className,
    active = false,
    style,
}) => {
    const buttonStyles = {
        padding: size === 'large' ? '12px 24px' : size === 'small' ? '6px 12px' : '8px 16px',
        fontSize: size === 'large' ? '1.2rem' : size === 'small' ? '0.8rem' : '1rem',
        backgroundColor:active ? '#28a745' : variant === 'primary' ? '#007bff' : variant === 'secondary' ? '#6c757d' : 'transparent',
        color:active ? '#fff': variant === 'primary' || variant === 'secondary' ? '#fff' : '#000',
        border: variant === 'primary' || variant === 'secondary' ? 'none' : '1px solid #000',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        outline: 'none',
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.5 : 1,
        margin:'10px',
        
        ...style,
    };

    const buttonClassName = `btn ${className || ''}`;

    return (
        <button
            className={buttonClassName}
            style={buttonStyles}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default MyButton;
/*using it

import './App.css';
import Button from './Components/MyButton';


function App() {

  const handleClick = () => {
    console.log('Butona tıklandı');
};

  return (
    <div className="App">
            <Button onClick={handleClick}>Standart Buton</Button>
            <Button variant="primary" onClick={handleClick}>Ana Buton</Button>
            <Button variant="secondary" onClick={handleClick}>İkincil Buton</Button>
            <Button size="small" onClick={handleClick}>Küçük Buton</Button>
            <Button size="large" onClick={handleClick}>Büyük Buton</Button>
            <Button disabled onClick={handleClick}>Devre Dışı Bırakılmış Buton</Button>
            <Button fullWidth onClick={handleClick}>Tam Genişlik Buton</Button>
            <Button className="custom-button" style={{ backgroundColor: 'green', color: '#fff' }} onClick={handleClick}>Özel Stil Buton</Button>
        
    </div>
  );
}

export default App;
*/