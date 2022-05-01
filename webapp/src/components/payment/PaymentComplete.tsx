
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
        <div>
            <Typography variant="h4" component="h2">Pedido finalizado</Typography>
            <Typography variant="h2" component="h2">Gracias por realizar tu compra</Typography>
            <Typography variant="h5" component="h2">Orden de entrega:</Typography>
            <ProfileViewer logoutEnabled={false}></ProfileViewer>
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
       
        </div>

    )
};

export default PaymentComplete;
