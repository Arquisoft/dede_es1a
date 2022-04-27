
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

const PaymentPayForm: React.FC<Props> = ({Props}) => {

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
                    Props.previusView();
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
                    Props.nextView();
                }}
            >
                Continuar
            </Button>
        </div>
        </div>
    )
};

export default PaymentPayForm;
