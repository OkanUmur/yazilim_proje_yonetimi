import { useContext, useEffect, useState} from 'react';
import MyButton from '../../Components/MyButton';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import CartContext from '../../Context/cartContext';
import axios from 'axios';
import MyContext from '../../Context/Context';
import { useTranslation } from 'react-i18next';







const MailModal=({isModalOpen,handleModalClose})=>{
    const {cart}=useContext(CartContext);
    const {showEmailAlert,setShowEmailAlert}=useContext(MyContext)
    const [email, setEmail] = useState('');
    const {t}=useTranslation();
  

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      };

     
    
    const handleSendInvoice = () => {
               // E-faturayı post etmek için gerekli veriyi oluştur
               const invoiceData = {
                email: email,
                cart: cart,
            };
    
            // E-fatura bilgilerini post et
            axios.post('http://localhost:3001/ereciept', invoiceData)
                .then(response => {
                    console.log('E-fatura başarıyla gönderildi:', response.data);
                    // Gönderme işlemi tamamlandıktan sonra modalı kapat
                    handleModalClose();
                })
                .catch(error => {
                    console.error('E-fatura gönderilirken bir hata oluştu:', error);
                });
                setShowEmailAlert(true)
        
      };
  

      useEffect(()=>{

        if(showEmailAlert){
          setTimeout(() => {
             setShowEmailAlert(false)
          },3000 );
        }
      },[showEmailAlert,setShowEmailAlert])
    
    return (
      <div>
        <Dialog open={isModalOpen} maxWidth='lg' onClose={handleModalClose}>
            <DialogTitle>{t('mail_modal.title')}</DialogTitle>
            <DialogContent>
                <p>{t('mail_modal.description')}</p>
                <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label={t('mail_modal.email_label')}
                    type="email"
                    fullWidth
                    value={email}
                    onChange={handleEmailChange}
                    
                />
              
            </DialogContent>
            <DialogActions>
                <MyButton onClick={handleModalClose} variant="outlined" color="secondary">
                    {t('mail_modal.cancel_button')}
                </MyButton>
                <MyButton onClick={handleSendInvoice} variant="contained" color="primary">
                    {t('mail_modal.send_button')}
                </MyButton>
            </DialogActions>
        </Dialog>
        
        </div>
    )
}

export default MailModal;