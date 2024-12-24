import React, { useContext } from 'react';
import '../../Styles/Keyboard.css';
import MyButton from '../MyButton';
import { LoginContext } from '../../Context/LoginContext';
import MyContext from '../../Context/Context';

function Keyboard() {
  const { setIsKeyboardOpen, handleKeyboardInput } = useContext(LoginContext);
  const {currentLanguage,languages}=useContext(MyContext);
  

  const handleKeyPress = (value) => {
    handleKeyboardInput(value);
  };

 

  const handleClose = () => {
    setIsKeyboardOpen(false);
  };

  return (
    <div className="main">
      <div className="keyboard">
        {languages[currentLanguage].map((row, index) => (
          <div key={index} className="row">
            {row.split('').map((key, index) => (
              <button key={index} className="key" onClick={() => handleKeyPress(key)}>
                {key}
              </button>
            ))}
          </div>
        ))}
        <div className="row">
        <button className="key" onClick={() => handleKeyPress('<')}>{'<'}</button>
        <button className="key" onClick={() => handleKeyPress('>')}>{'>'}</button>

          <button className="key space" onClick={() => handleKeyPress(' ')}>
            Space
          </button>
          <button className="key" onClick={() => handleKeyPress('.')}>
            .
          </button>
          <button className="key" onClick={() => handleKeyPress(';')}>
            ;
          </button>
        </div>
      </div>
      <div>
        <MyButton style={{ backgroundColor: '#ff0000', width: '100px', color: '#fff', marginLeft: '10px' }} onClick={() => handleKeyPress('sil')}>
          Sil
        </MyButton>
        <MyButton style={{ backgroundColor: '#ffcc00', width: '100px', color: '#000', marginLeft: '10px' }} onClick={handleClose}>
          Kapat
        </MyButton>
      </div>
     
    </div>
  );
}

export default Keyboard;
