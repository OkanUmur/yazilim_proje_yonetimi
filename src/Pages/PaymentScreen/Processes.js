import { Link } from "react-router-dom";
import MyButton from "../../Components/MyButton";
import MailModal from "./MailModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Proceses=()=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {t}=useTranslation();
  
  
    const handleModalOpen = () => {
      setIsModalOpen(true);
    };
  
    const handleModalClose = () => {
      setIsModalOpen(false);
    };
    return(
      <div>
      <h1>{t('processes_title')}</h1>
      <div>
        <MyButton fullWidth variant='primary' onClick={handleModalOpen}>
          {t('e_invoice')}
        </MyButton>
        {isModalOpen && <MailModal isModalOpen={isModalOpen} handleModalClose={handleModalClose}/>}
        
        <MyButton fullWidth variant='secondary'>{t('gift_voucher')}</MyButton>

        <MyButton fullWidth variant='primary'>{t('e_wallet')}</MyButton>

        <MyButton fullWidth variant='secondary'>{t('hadi_wallet')}</MyButton>

        <Link to="/sales">
          <MyButton fullWidth variant='primary'>
            {t('return_to_orders')}
          </MyButton>
        </Link>
      </div>
    </div>
    )
}

export default Proceses;