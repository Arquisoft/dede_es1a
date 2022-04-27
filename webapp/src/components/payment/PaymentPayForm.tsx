
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


type Props = {
    nextView: () => void;
    previusView: () => void;
};

const PaymentPayForm: React.FC<Props> = ({nextView, previusView}) => {

    return (
        
        <div className='paymentpage-payment' >
            <LoginPod></LoginPod>
            

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
                disabled={false}
                onClick={() => {
                    nextView();
                }}
            >
                Continuar
            </Button>
        </div>
        </div>
    )
};

export default PaymentPayForm;
