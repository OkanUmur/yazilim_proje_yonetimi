import React, {  useContext, useState } from "react";
import { Dialog, DialogContent, Button, Typography } from "@mui/material";
import CartContext from "../../Context/cartContext";
import {useTranslation} from 'react-i18next';


const CampaignModal = ({filteredCampaigns}) => {

    const {closeModal}=useContext(CartContext);
    const {t}=useTranslation();
   
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    closeModal();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography variant="h5">{t('campaign_modal.title')}</Typography>
        {filteredCampaigns.map((campaign) => (
          <div key={campaign.id}>
            <Typography>{campaign.name}</Typography>
            
          </div>
        ))}
        <Button variant="contained" onClick={handleClose}>{t('campaign_modal.close_button')}</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignModal;
