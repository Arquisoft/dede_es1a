
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import '../css/PaymentPage.css'
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

const PaymentPage: React.FC<Props> = ({cartContent, setNewCart}) => {

    const [isPaid, setPaid] = useState(false);
    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);
    
    const handlePay = () => {
        if(!isPaid)
            return;
        setNewCart(true);
        setPaid(false);
    }
    function getAddressContent() {
        const memoryCart = localStorage.getItem("address");
        
        if (memoryCart) 
            return memoryCart;
        else 
          return "";
        
    }
    const [deliveryCosts, setDeliveryCosts] = useState<Number>();
    const findDC = async () => {
        setDeliveryCosts(await getDeliveryCosts(getAddressContent()));
    }
    
    useEffect(() => {
        findDC();
    }, []);

    function getFinalDeliveryCosts(){
        if (deliveryCosts){
            return (Number(deliveryCosts.toString()) + Number(getTotalPrice())).toFixed(2);
        }else{
            return 0;
        }
    }
    return (
        <div className='paymentpage-payment' >

        <h1 id='title-payment' >Your BUY</h1>
            <div 
                id='info-payment'
            >
                <div id='articles-payment'>
                    <h1>Articles</h1>
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
                    <h2>Costes: {getTotalPrice().toFixed(2)}€</h2>
                    <h2>Costes de Envio: {Number(deliveryCosts).toFixed(2)}€</h2>
                    <h2>Total: {getFinalDeliveryCosts()}€</h2>
                    
                    
                    {/* Aqui cogemos la dir de los pods y sacamos los costes envio */}
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
                    }}
                >
                    Checkout
                </Button>
            </div>
        </div>
    )
};

export default PaymentPage;
