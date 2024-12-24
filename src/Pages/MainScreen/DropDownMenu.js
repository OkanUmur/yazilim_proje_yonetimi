import React, { useContext, useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faShoppingCart, faEye, faUndo, faCog } from '@fortawesome/free-solid-svg-icons';
import '../../Styles/DropDownMenu.css'; 
import MyContext from '../../Context/Context';
import MyAlertify from '../../Components/MyAlertify';
import { useTranslation } from 'react-i18next';

const DropdownMenu = () => {
  const {isStoreOnline,setPath}=useContext(MyContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const {t}=useTranslation();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSalesClick = () => {
    if (isStoreOnline) {
      handleClose();
    } else {
      setShowAlert(true)
      handleClose();
      setTimeout(() => {
        setShowAlert(false); 
      }, 2000);
    }
  };




  return (
<div>
      <Button
        className="dropdown-button"
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
        onClick={handleClick}
      >
        {t('menu_title')}  
        <FontAwesomeIcon icon={faBars} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="menu"
      >
        <Link to={isStoreOnline ? "/sales" : "#"}>
          <MenuItem onClick={handleSalesClick} className="menu-item">
            <FontAwesomeIcon icon={faShoppingCart} className="menu-item-icon" />
            <span className="menu-item-text">{t('sales')}</span>
          </MenuItem>
        </Link>
        <Link to="/showprice">
          <MenuItem onClick={handleClose} className="menu-item">
            <FontAwesomeIcon icon={faEye} className="menu-item-icon" />
            <span className="menu-item-text">{t('price_view')}</span>
          </MenuItem>
        </Link>
        <Link to='/returnorder'>
          <MenuItem onClick={handleClose} className="menu-item">
            <FontAwesomeIcon icon={faUndo} className="menu-item-icon" />
            <span className="menu-item-text">{t('return_order')}</span>
          </MenuItem>
        </Link>
      
        <Link to={'/settings'} onClick={()=>setPath("/main")}>
          <MenuItem onClick={handleClose} className="menu-item">
            <FontAwesomeIcon icon={faCog} className="menu-item-icon" />
            <span className="menu-item-text">{t('settings')}</span>
          </MenuItem>
        </Link>
      </Menu>
      {showAlert && (
        <MyAlertify variant="error">
          {t('offline_alert')}
        </MyAlertify>
      )}
    </div>
  );
};

export default DropdownMenu;
