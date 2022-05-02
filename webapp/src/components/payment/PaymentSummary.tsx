
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

const PaymentSummary: React.FC<Props> = ({ cartContent, simplificate }) => {

    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);

    function getAddressContent() {
        const memoryCart = localStorage.getItem("address");

        if (memoryCart)
            return memoryCart;
        else
            return "";
    }

    const [addressOK, setAddresOk] = useState<boolean>();
    const [deliveryCosts, setDeliveryCosts] = useState<Number>();
    const findDC = async () => {
        if (localStorage.getItem("address")) {
            setDeliveryCosts(await getDeliveryCosts(getAddressContent()));
            setAddresOk(true);
        } else {
            setAddresOk(false);
        }
    }

    useEffect(() => {
        findDC();
    }, []);

    function getFinalDeliveryCosts() {
        if (deliveryCosts) {
            return (Number(deliveryCosts.toString()) + Number(getTotalPrice())).toFixed(2);
        } else {
            return Number(getTotalPrice()).toFixed(2);
        }
    }

    return (
        <Grid container spacing={2} rowSpacing={2} >

            
            <Grid item xs={12} ></Grid>
            <Grid item xs={12} ></Grid>
            <Grid item xs={12} >
                <Typography variant="h4" component="h4">Resumen de Pago</Typography>
            </Grid>

            <Grid item xs={12} >
                <Typography variant="h5" component="h5">Costes (no iva): {(getTotalPrice() - (getTotalPrice() * 0.21)).toFixed(2)}€</Typography>
            </Grid>
            <Grid item xs={12} >
                <Typography variant="h5" component="h5">Costes (iva 21%): {getTotalPrice().toFixed(2)}€</Typography>
            </Grid>


            {simplificate ?
                null
                :
                <Grid item xs={12} >
                    {addressOK ?
                        <Grid item xs={12} >
                            <Typography variant="h5" component="h5">
                                Costes de Envio:{Number(deliveryCosts).toFixed(2)}€
                            </Typography>
                        </Grid>
                        :
                        <Grid item xs={12} ><Typography variant="h5" component="h5">
                            No se ha especificado una dirección correcta, el pedido sera almacenado en la tienda a espera de recogida
                        </Typography>
                        </Grid>

                    }
                    
                    <Grid item xs={12} >
                        <Typography variant="h5" component="h5">Total: {getFinalDeliveryCosts()}€</Typography>
                    </Grid>
                    </Grid>
            }
        </Grid>
    )
};

export default PaymentSummary;
