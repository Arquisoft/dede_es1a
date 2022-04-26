
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
};

const PaymentPayForm: React.FC<Props> = ({}) => {

    

    
    return (
        
        <div className='paymentpage-payment' >
            <LoginPod></LoginPod>
        </div>
    )
};

export default PaymentPayForm;
