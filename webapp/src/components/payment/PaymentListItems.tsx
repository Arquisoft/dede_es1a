
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
        {cartContent.length === 0 ? 
            <div>
                <h2>No se puede completar la compra:</h2> 
                <h3>No hay articulos en el pedido</h3> 

                <Button
                        size="medium"
                        disableElevation
                        variant="contained"
                        disabled={false}
                        onClick={() => {
                            previusView();
                            window.location.href = '/home';
                        }}
                    >
                        Pagina principal
                    </Button>
            </div>
        : 
            <div>
                {cartContent.map(item => ( <PaymentItem   item={item}  /> ))}
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
                            disabled={cartContent.length<=0}
                            onClick={() => {
                                handlePay();
                                nextView();
                            }}
                        >
                            Completar Pago
                        </Button>
                </div>
            </div> 
        }
        </div>
    )
};

export default PaymentListItems;