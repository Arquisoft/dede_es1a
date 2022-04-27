
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
import PaymentItem from './PaymentItem';


type Props = {
    cartContent: Rock[];
    nextView: () => void;
    previusView: () => void;
    handlePay: () => void;
};

const PaymentListItems: React.FC<Props> = ({cartContent, nextView, previusView, handlePay}) => {

    return (
        <div id='articles-payment'>
        <h1>Articulos</h1>
        <div className="items-cart">
            {cartContent.map(item => ( <PaymentItem   item={item}  /> ))}
        </div>
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
                    handlePay();
                    nextView();
                }}
            >
                Completar Pago
            </Button>
        </div>
    </div>



    )
};

export default PaymentListItems;
