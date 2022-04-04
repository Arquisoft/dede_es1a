import {Roca} from '../../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import './PaymentPage.css'
import { CardContent, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState } from 'react';


type Props = {
    cartContent: Roca[];
    handleResetCart: () => void;
};

const PaymentPage: React.FC<Props> = ({cartContent, handleResetCart}) => {

    const [isPaid, setPaid] = useState(false);
    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);
    
    const showMessagePaymentCompleted = () => {
        return(
            <h1>Articles</h1>
        );
    }

    const handlePay = () => {
        let vo = document.getElementById('info-payment');
        
        if(vo != null) {
            (vo as HTMLElement).style.visibility= 'visible';
        };
        handleResetCart();

    }

    return (
        <div>
        <h1 id='title-payment' >Your BUY</h1>
        <div className='paymentpage-payment' >

            <div 
                id='info-payment'
            >
                <div id='articles-payment'>
                    <h1>Articles</h1>
                    <div>
                        {   cartContent.map(roca => (
                                <div id="items-payment">
                                    <h2 id='items-name-payment'>{roca.name}</h2>
                                    <h2 id='items-quantity-payment'>x{roca.quantityCart}</h2>
                                    <h2 id='items-total-payment'>{roca.quantityCart*roca.price}€</h2>
                                </div>
                            ))
                        }
                    </div>
                </div>
                
                <div id='bill-payment'>
                    <h1>Payment summary</h1>
                    <h2>Cost (no iva): {  (getTotalPrice() - (getTotalPrice()*0.21)).toFixed(2) }€</h2>
                    <h2>Cost: {getTotalPrice().toFixed(2)}€</h2>
                    
                    <h2>Cost (shipping costs): {(getTotalPrice()+ 12).toFixed(2)}€</h2>
                    {/* Aqui cogemos la dir de los pods y sacamos los costes envio */}
                </div>
            </div>


            {isPaid ? <h1>Purchase made</h1> : null}

            <div id='actionButtons-payment'>
            <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    href = "/catalog"
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
                    }}
                >
                    Checkout
                </Button>
            </div>
        </div>
        </div>
    )
};

export default PaymentPage;
