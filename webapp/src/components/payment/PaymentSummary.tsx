
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
        const memoryCart = sessionStorage.getItem("address");
        
        if (memoryCart) 
            return memoryCart;
        else 
          return "";
    }

    const[addressOK, setAddresOk] = useState<boolean>();
    const [deliveryCosts, setDeliveryCosts] = useState<Number>();
    const findDC = async () => {
        if(sessionStorage.getItem("address")){
            setDeliveryCosts(await getDeliveryCosts(getAddressContent()));
            setAddresOk(true);
        }else{
            setAddresOk(false);
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
            <Typography variant="h4" component="h4">Resumen de Pago</Typography>
            <Typography variant="h4" component="h4">Costes (no iva): {  (getTotalPrice() - (getTotalPrice()*0.21)).toFixed(2) }€</Typography>
            <Typography variant="h4" component="h4">Costes (iva 21%): { getTotalPrice().toFixed(2) }€</Typography>

            {simplificate ? 
                null
                : 
                <div>
                    {addressOK ?
                        <Typography variant="h4" component="h4">
                            Costes de Envio:{Number(deliveryCosts).toFixed(2)}€
                            </Typography>
                    :
                        <Typography variant="h4" component="h4">
                            No se ha especificado una dirección correcta, el pedido sera almacenado en la tienda a espera de recogida
                        </Typography>
                    }
                    
                    <Typography variant="h4" component="h4"><h2>Total: {getFinalDeliveryCosts()}€</h2></Typography>
                    
                </div>
            }
        </div>
    )
};

export default PaymentSummary;
