import { Order, Rock } from '../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState, useEffect } from 'react';
import { getRocas, getRocksById } from '../api/api';

type OrderProps = {
    orders: Order[]
}

const OrderUser = (order: OrderProps) => {

    // const [rock, setRock]  = React.useState<Rock[]>([]);
    // async function cargarRoca() {
    //     let rocks:Rock[] = await getRocksById("1");
    //     setRock(rocks);
    // }
    // useEffect(() => {
    //     cargarRoca();
    //     return () => {
    //         setRock([]);
    //     }
    // }, []);
    return (
        
        <>
            {order.orders.map( (o) => {
                console.log(order.orders[0]);
                return (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">{o.productName}</TableCell>
                        <TableCell component="th" scope="row">{o.productType}</TableCell>
                        <TableCell component="th" scope="row">{o.date.toLocaleString().substring(0, 10)}</TableCell>
                        <TableCell component="th" scope="row">{o.price}€</TableCell>
                    </TableRow>
                );  
            })}
        </>
    );
}

export default OrderUser;