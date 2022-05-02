
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
};

const PaymentPayForm: React.FC<Props> = ({nextView, previusView}) => {

    const [cardIsValid, setCardIsValid] = useState(false);
    
    return (
        <Grid container spacing={2} className='paymentpage-payment' >
            <Grid item xs={12}>
                <Typography variant="h4" component="h4">Método de pago</Typography>
            </Grid>
            <Grid item xs={12}>
                <CardForm setCardIsValid={setCardIsValid}></CardForm>
            </Grid>
            <Grid item xs={12}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
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
            </Grid>
            <Grid item xs={6}>
                <Button
                    size="medium"
                    disableElevation
                    variant="contained"
                    disabled={!cardIsValid}
                    onClick={() => {
                        nextView();
                    }}
                >
                    Guardar y Continuar
                </Button>
            </Grid>
        </Grid>
    )
};

export default PaymentPayForm;


