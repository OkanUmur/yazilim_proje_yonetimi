import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next'; // i18next kütüphanesini kullan
import MyButton from '../../Components/MyButton';
import '../../Styles/Settings.css';
import MyContext from '../../Context/Context';
import { useNavigate } from 'react-router-dom';


const Settings = () => {
  const { theme, toggleTheme, currentLanguage, setCurrentLanguage,Path } = useContext(MyContext);
  const {t,i18n} = useTranslation(); 
  const navigate=useNavigate();
  

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const setLang = async (lang) => {
    await i18n.changeLanguage(lang);
  };
  

  const handleGoBack = () => {
    if (Path) {
      navigate(Path);
    } else {
      navigate('/');
    }
  }
    

  return (
    <>
 <button onClick={handleGoBack} className="navigate-button">{t("Back")}</button>
    <div className="SettingsContainer">
      <h2 className="SettingsTitle">{t('settings_title')}</h2>
      <MyButton className="SettingsButton" onClick={toggleTheme}>{theme === 'light' ? t('dark_theme') : t('light_theme')}</MyButton>
      <div className="LanguageSelector">
        <label className="LanguageLabel">{t('keyboard_language_selection')}</label>
        <select className="LanguageSelect" value={currentLanguage} onChange={(e) => handleLanguageChange(e.target.value)}>
          <option className="LanguageOption" value="EN">{t("language_option_en")}</option>
          <option className="LanguageOption" value="TR">{t("language_option_tr")}</option>
          <option className="LanguageOption" value="JP">{t('language_option_jp')}</option>
          <option className="LanguageOption" value="FR">{t('language_option_fr')}</option>
          <option className="LanguageOption" value="AR">{t('language_option_ar')}</option>
          {/* Diğer dillerin seçeneklerini buraya ekle */}
        </select>
      </div>
      <div className="LanguageSelector">
        <label className="LanguageLabel">{t('language_selection')}</label>
        <select className="LanguageSelect" value={i18n.language} onChange={(e) => setLang(e.target.value)}>
          <option className="LanguageOption" value="en">{t('language_option_en')}</option>
          <option className="LanguageOption" value="tr">{t('language_option_tr')}</option>
          <option className="LanguageOption" value="fr">{t('language_option_fr')}</option>
          <option className="LanguageOption" value="jp">{t('language_option_jp')}</option>
          <option className="LanguageOption" value="ar">{t('language_option_ar')}</option>
          
          {/* Diğer dillerin seçeneklerini buraya ekle */}
        </select>
      </div>
    </div>

    </>
  );
};

export default Settings;
