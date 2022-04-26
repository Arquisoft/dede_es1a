
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import '../css/PaymentProcess.css'
import { CardContent, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Rock } from '../shared/shareddtypes';
import { getDeliveryCosts } from '../api/api';
import { findConfigFile } from 'typescript';


type Props = {
    cartContent: Rock[];
    setNewCart: (isNewCart: boolean) => void;
};

const PaymentProcess: React.FC<Props> = ({cartContent, setNewCart}) => {

    return (
        <div className='PaymentProcess-payment' >
        
        

        <h1 id='title-payment' >Mi compra</h1>
            <div 
                id='info-payment'
            >
                <div id='articles-payment'>
                    <h1>Articulos</h1>
                    <div id='articles-list-payment'>
                        {   cartContent.map(Rock => (
                                <div id="items-payment">
                                    <h2 id='items-name-payment'>{Rock.name}</h2>
                                    <h2 id='items-quantity-payment'>x{Rock.quantityCart}</h2>
                                    <h2 id='items-total-payment'>{Rock.quantityCart*Rock.price}€</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div id='bill-payment'>
                    <h1>Resumen de Pago</h1>
                    <h2>Costes (no iva): {  (getTotalPrice() - (getTotalPrice()*0.21)).toFixed(2) }€</h2>
                    <h2>Costes (iva 21%): {getTotalPrice().toFixed(2)}€</h2>
                    <h2>Costes de Envio: {Number(deliveryCosts).toFixed(2)}€</h2>
                    <h2>Total: {getFinalDeliveryCosts()}€</h2>
                    
                </div>
            </div>

            {isPaid ? <h1>Compra realizada</h1> : null}

            <div id='actionButtons-payment'>
            <Button
                    id="btnHome-payment"
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    onClick = {() =>{handlePay(); window.location.href = '/home';}  
                    }
                >
                    Home
                </Button>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    onClick={() => {
                        setPaid(true); 
                        window.location.href = '/home';
                    }}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
};

export default PaymentProcess;
