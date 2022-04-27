
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
};

const PaymentComplete: React.FC<Props> = ({}) => {
    return (
        <div>
            <Typography variant="h2" component="h2">Pedido finalizado</Typography>
            <Typography variant="h5" component="h2">Direccion de envio:</Typography>
            <ProfileViewer cartContent={[]}></ProfileViewer>
        </div>

        // localStorage.clear();
    )
};

export default PaymentComplete;
