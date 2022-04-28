import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import { TableContainer, TableHead} from '@mui/material';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Order } from '../shared/shareddtypes';
import Paper from '@mui/material/Paper';
import {  getOrders } from '../api/api';
import OrderUser from '../components/OrderUser';

type Id = {
    email:String
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#1976d2",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
}));

async function ordersByEmail(order:Order[], orderEmail:Order[], email:String){
    order.forEach(e => {if(e.userEmail == email){ orderEmail.push(e) }});
}

const OrderHistory = (id: Id) => {
    const [orders, setOrders]  = React.useState<Order[]>([]);
    const[ordersEmail, setOrdersEmail] = React.useState<Order[]>([]);
    
    async function cargarPedidos() {
        setOrders(await getOrders());
    }

    useEffect(() => {cargarPedidos();}, []);

    ordersByEmail(orders,ordersEmail,id.email);

    return (
        <div>
            <div style={{ margin: '170px' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                            <StyledTableCell>Código del pedido</StyledTableCell>
                                <StyledTableCell>Fecha de orden</StyledTableCell>
                                <StyledTableCell>Precio del pedido</StyledTableCell>
                                <StyledTableCell>Productos</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <OrderUser orders = {ordersEmail} />
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>

    );
}

export default OrderHistory;