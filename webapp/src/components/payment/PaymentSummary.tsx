
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { CardContent, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Rock } from '../../shared/shareddtypes';
import { getDeliveryCosts } from '../../api/api';
import { findConfigFile } from 'typescript';


type Props = {
    cartContent: Rock[];
    simplificate: boolean; // true: solo muestra total  : false: muestra desglose (+ envio)
};

const PaymentSummary: React.FC<Props> = ({cartContent, simplificate}) => {

    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);
    
    function getAddressContent() {
        const memoryCart = localStorage.getItem("address");
        
        if (memoryCart) 
            return memoryCart;
        else 
          return "";
        
    }
    
    const [deliveryCosts, setDeliveryCosts] = useState<Number>();
    const findDC = async () => {
        if(localStorage.getItem("address")){
            setDeliveryCosts(await getDeliveryCosts(getAddressContent()));
        }
    }
    
    useEffect(() => {
        findDC();
    }, []);
    
    function getFinalDeliveryCosts(){
        if (deliveryCosts){
            return (Number(deliveryCosts.toString()) + Number(getTotalPrice())).toFixed(2);
        }else{
            return Number(getTotalPrice()).toFixed(2);
        }
    }

    return (
        <div id='bill-payment'>
            <h1>Resumen de Pago</h1>
            <h2>Costes (no iva): {  (getTotalPrice() - (getTotalPrice()*0.21)).toFixed(2) }€</h2>
            <h2>Costes (iva 21%): { getTotalPrice().toFixed(2) }€</h2>

            {simplificate ? 
                null
                : 
                <div>
                    <h2>Costes de Envio: {Number(deliveryCosts).toFixed(2)}€</h2>
                    <h2>Total: {getFinalDeliveryCosts()}€</h2>
                </div>
            }
        </div>
    )
};

export default PaymentSummary;
