
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
import LoginPod from '../solid-pods/LoginPod';
import ProfileViewer from '../solid-pods/ProfileViewer';


type Props = {
    nextView: () => void;
};

const PaymentComplete: React.FC<Props> = ({nextView}) => {
    return (
        <Grid container spacing={2} className='paymentpage-payment' >
            <Grid item xs={12}>
            <Typography variant="h4" component="h2">Pedido finalizado</Typography>

            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5" component="h2">¡Tu pedido ya está en camino!</Typography>
                
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h5" component="h2">Orden de entrega:</Typography>
                
            </Grid>
            <Grid item xs={12}>
            <ProfileViewer logoutEnabled={false}></ProfileViewer>
                
            </Grid>
            <div id='actionButtons-payment'>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    onClick={() => {
                        nextView();
                    }}
                >
                    Página principal
                </Button>
            </div>
       
        </Grid>

    )
};

export default PaymentComplete;
