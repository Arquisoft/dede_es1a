import Grid from '@mui/material/Grid';
import {  useEffect } from 'react';

import Button from '@mui/material/Button';
import { AppBar, Card, CardContent, Typography } from '@mui/material';
import { North } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { Rock } from '../../shared/shareddtypes';
import { addOrder } from '../../api/api';
import PaymentSummary from './PaymentSummary';
import React from 'react';
import PaymentPayForm from './PaymentPayForm';
import PaymentComplete from './PaymentComplete';
import PaymentListItems from './PaymentListItems';
import PaymentShipping from './PaymentShipping';


const NUM_VIEWS = 4;
const SHIPPING_VIEW = 0;
const PAYMENT_FORM_VIEW = 1;
const ITEMS_TO_BUY_VIEW = 2;
const PAYMENT_COMPLETE = 3;

type Props = {
    cartContent: Rock[];
    setNewCart: (isNewCart: boolean) => void;
};

const PaymentPage: React.FC<Props> = ({ cartContent, setNewCart }) => {


    const [paymentView, setPaymentView] = React.useState(0);
    useEffect(() => {
        if (paymentView < 0 || paymentView >= NUM_VIEWS) {
            window.location.href = '/home';
            setPaymentView(0);
        }
    }, [paymentView]);


    const nextView = () => {
        setPaymentView((paymentView) => paymentView + 1);
    };
    const previusView = () => {
        setPaymentView((paymentView) => paymentView - 1);
    };

    const getView = (paymentView: number) => {
        switch (paymentView) {
            case ITEMS_TO_BUY_VIEW:
                return (
                    <PaymentListItems
                        cartContent={cartContent}
                        nextView={nextView}
                        previusView={previusView}
                        handlePay={handlePay}
                    ></PaymentListItems>
                );

            case PAYMENT_FORM_VIEW:
                return (
                    <PaymentPayForm
                        nextView={nextView}
                        previusView={previusView}
                    ></PaymentPayForm>
                );

            case SHIPPING_VIEW:
                return (
                    <PaymentShipping
                        nextView={nextView}
                        previusView={previusView}
                        setLoggedPod={setLoggedPod}
                        isLoggedPod={isLoggedPod}
                    ></PaymentShipping>
                );

            case PAYMENT_COMPLETE:
                return (
                    <PaymentComplete nextView={nextView} ></PaymentComplete>
                );
        }
    }


    const [isLoggedPod, setLoggedPod] = React.useState(false);

    const getPaymentSummary = () => {
        return <PaymentSummary cartContent={cartContent} simplificate={(!isLoggedPod)}></PaymentSummary>
    }

    function getUserEmail() {
        const userEmail = sessionStorage.getItem("userLogged");
        if (userEmail)
            return userEmail;
        else
            return "";
    }

    const addOrders = async (rock: Rock) => {
        let code = rock.id;
        let rockId = rock.rockId;
        let price = rock.price;
        let name = rock.name;
        let type = rock.type;
        console.log(getUserEmail());
        await addOrder({ code: code.toString(), userEmail: getUserEmail(), price: price, productId: rockId, productName: name, productType: type, orderId: "", date: new Date });
    }

    const handlePay = () => {
        setNewCart(true);

        if (sessionStorage.getItem("userLogged")) {
            cartContent.forEach(function (rock) {

                for (let i = 0; i < rock.quantityCart; i++) {
                    addOrders(rock);
                }
            });
            alert("Su pedido ha sido realizado correctamente");
        } else {
            alert("Se ha producido un error en la creación de su pedido");
        }
    }

    return (
        <Card>
        <Grid container spacing={2} className='PaymentProcess-payment' >
            <Grid item xs={12}>
                <AppBar position='relative' sx={{ padding: '2vh' }} >
                    <Typography variant="h4" component="h4"> Mi compra</Typography>
                </AppBar>
            </Grid>
            <Grid item xs={8}>
                {getView(paymentView)}
            </Grid>
            <Grid item xs={4}>
                {paymentView === PAYMENT_COMPLETE ? null : getPaymentSummary()}
            </Grid>
        </Grid>
        </Card>
    )
};

export default PaymentPage;
