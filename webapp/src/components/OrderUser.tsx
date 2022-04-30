import { Order, Rock } from '../shared/shareddtypes';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import React, { useState, useEffect } from 'react';
import { getRocas, getRocksById } from '../api/api';

type OrderProps = {
    orders: Order[]
}

const OrderUser = (order: OrderProps) => {
    return (
        
        <>
            {order.orders.map( (o) => {
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