
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

import { SessionProvider, useSession } from "@inrupt/solid-ui-react";
import ProfileViewer from '../solid-pods/ProfileViewer';
import CardForm from './creditCardForm/CardForm';
import CardFormT from './creditCardForm/CardForm';

type Props = {
    nextView: () => void;
    previusView: () => void;
    setLoggedPod: (b:boolean) => void;
    isLoggedPod: boolean;
};

const PaymentPayForm: React.FC<Props> = ({nextView, previusView, setLoggedPod, isLoggedPod}) => {
    
    return (
        <Grid container spacing={2} className='paymentpage-payment' >
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">Método de pago</Typography>
            </Grid>
            <Grid item xs={12}>
                <CardForm></CardForm>
            </Grid>
            <Grid item xs={12}>
            <Typography variant="h4" component="h4">Direccion de envío</Typography>
                
            </Grid>
            <Grid item xs={12}>
                {(!isLoggedPod) ? 
                <LoginPod setLoggedPod={setLoggedPod}></LoginPod>
                : <ProfileViewer logoutEnabled={true} />}
            </Grid>
            <Grid item xs={12}>
            <div id='actionButtons-payment'>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={false}
                    onClick={() => {
                        previusView();
                    }}
                >
                    Volver
                </Button>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={!isLoggedPod}
                    onClick={() => {
                        nextView();
                    }}
                >
                    Guardar y Continuar
                </Button>
            </div>
            </Grid>
            

            
        </Grid>
    )
};

export default PaymentPayForm;


