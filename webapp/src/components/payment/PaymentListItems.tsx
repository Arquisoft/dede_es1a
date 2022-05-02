
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
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


                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, border: 2 }} aria-label="simple table">
                        <TableHead sx={{ border:2 } }>
                            <TableRow > 
                                <TableCell>Articulos</TableCell>
                                <TableCell align="right">Precio (€/Ud)</TableCell>
                                <TableCell align="right">Unidades</TableCell>
                                <TableCell align="right">Precio Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {cartContent.map((rock) => (
                            <TableRow
                                key={rock.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row"> {rock.name}</TableCell>
                            <TableCell align="right">{rock.price +" €"}</TableCell>
                            <TableCell align="right">{rock.quantityCart}</TableCell>
                            <TableCell align="right">{rock.price*rock.quantityCart +" €"}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>

                    <Grid container spacing={2} className='paymentpage-payment' >
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
                            disabled={cartContent.length<=0}
                            onClick={() => {
                                handlePay();
                                nextView();
                            }}
                        >
                            Completar Pago
                        </Button>
                        </Grid>
                    </Grid>
            </div> 
        }
        </div>
    )
};

export default PaymentListItems;