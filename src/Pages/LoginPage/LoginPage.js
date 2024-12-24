// LoginPage.js
import React, {  useContext } from 'react';
import MyButton from '../../Components/MyButton';
import MyInput from '../../Components/MyInput';
import '../../Styles/LoginPage.css'
import '../../index.css'
import { LoginContext } from '../../Context/LoginContext';
import MyAlertify from '../../Components/MyAlertify';
import Keyboard from '../../Components/Keyboard/Keyboard';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import MyContext from '../../Context/Context';




const LoginPage = () => {
   
    const { username, setUsername, password, setPassword, handleLogin,showAlert,isKeyboardOpen, handleFocus, logoRef,version } = useContext(LoginContext);
    
    const {setPath}=useContext(MyContext);
    const {t}=useTranslation();

    const navigate=useNavigate();
  
    const handleButtonClick = () => {
        setPath("/")
        navigate('/settings');
    };
    
    
   
  
    return (
        <div>
         <button onClick={handleButtonClick} className="navigate-button">
         <FontAwesomeIcon icon={faCog} className="menu-item-icon" />
            {t("settings_title")}
            </button>
        <div className="login-page">
        <div className="version-info">
                    {version && `${t("version")}: ${version}`}
                </div>
        <div className="logo" id='logo' ref={logoRef}>
            <img src="Images/logo.jpeg"  alt="Logo" />
        </div>
        <div className='info-text'>
            <h3>{t('welcome')}!</h3>
            <p>{t('enter_credentials')}</p>
        </div>
        <form onSubmit={handleLogin} className="login-form">
            <MyInput
                type="text"
                placeholder={t('username_placeholder')}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={(e) => handleFocus(e)}
                required
            />
            <MyInput
                type="password"
                placeholder={t('password_placeholder')}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={(e) => handleFocus(e)}
                required
            />
            <MyButton fullWidth variant='primary' type="submit">{t('login_button')}</MyButton>
        </form>
        {showAlert && (
            <MyAlertify variant="error">
                {t('invalid_credentials')}
            </MyAlertify>
        )}
        {isKeyboardOpen && <Keyboard />}
    </div>
    </div>
    );
};

export default LoginPage;
