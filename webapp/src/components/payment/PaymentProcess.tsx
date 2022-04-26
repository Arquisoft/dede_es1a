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
                    <div className="items-cart">
                        {cartContent.map(item => (
                            <PaymentItem   item={item}  />
                            ))
                        }
                    </div>
                </div>
                
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
