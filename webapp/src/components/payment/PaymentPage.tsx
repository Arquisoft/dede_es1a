import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
// import '../css/PaymentProcess.css'
import { CardContent, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Rock } from '../../shared/shareddtypes';
import { getDeliveryCosts } from '../../api/api';
import { findConfigFile } from 'typescript';
import PaymentSummary from './PaymentSummary';
import CartItem from '../CartItem';
import PaymentItem from './PaymentItem';
import React from 'react';
import PaymentPayForm from './PaymentPayForm';


type Props = {
    cartContent: Rock[];
    setNewCart: (isNewCart: boolean) => void;
};

const PaymentPage: React.FC<Props> = ({cartContent, setNewCart}) => {


    const [paymentView, setPaymentView] = React.useState(0);
    const nextView = () => {
        setPaymentView((paymentView) => paymentView + 1);
      };
    const previusView = () => {
        setPaymentView((paymentView) => paymentView - 1);
    };

    const getView = (paymentView: number) => {
        switch (paymentView) {
          case 0:
            return (
                <div id='articles-payment'>
                    <h1>Articulos</h1>
                    <div className="items-cart">
                        {cartContent.map(item => (
                            <PaymentItem   item={item}  />
                            ))
                        }
                    </div>
                </div>
            );

          case 1:
            return (

                <PaymentPayForm></PaymentPayForm>

            //   <Delivery
            //     cartItems={cartItems}
            //     siguientePaso={siguientePaso}
            //     deliveryCost={gastosEnvio}
            //     setDeliveryCost={setDeliveryCost}
            //     setAddress={setAddress}
            //     address={address}
            //     setDeliveryDate={setDeliveryDate}
            //   />
            );
      }
    }


    return (
        <div className='PaymentProcess-payment' >
        
        <h1 id='title-payment' >Mi compra</h1>
            <div 
                id='info-payment'
            >
                {getView(paymentView)}
                
                <PaymentSummary cartContent={cartContent} simplificate={true}></PaymentSummary>

            </div>

            <div id='actionButtons-payment'>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    onClick={() => {
                        // setPaid(true); 
                        // window.location.href = '/home';
                        nextView();
                        
                    }}
                >
                    Checkout
                </Button>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    onClick={() => {
                        // setPaid(true); 
                        // window.location.href = '/home';
                        nextView();
                    }}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
};

export default PaymentPage;
