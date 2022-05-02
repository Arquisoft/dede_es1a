import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Rock } from '../../shared/shareddtypes';
import '../../css/CartItem.css';

type Props = {
    item: Rock;
}

const PaymentItem: React.FC<Props> = ({item}) => {
    return (
        <Card className="cartItem-ci" sx={{ maxWidth: 900 } }>
            
            <CardContent>
            <Grid container spacing={2} className='PaymentProcess-payment' >
                <Grid item xs={4}>                                                                                                 
                    <CardMedia
                        className = "img-ci"
                        component="img"
                        sx={{ width: 120, maxWidth: 120 }}
                        image={item.img}
                        alt={item.name}
                    />
                </Grid>
                <Grid item xs={8}>
                        
                    
            <Grid container spacing={2} className='PaymentProcess-payment' >
                    <Grid item xs={3}>
                        <Typography variant="h5">
                            {item.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>  
                        <Typography id="price-ci">
                            {(item.price).toFixed(2) + " €"}
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography id="quantity-ci">
                            {item.quantityCart + " uds " }
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography id="price-ci">
                            {(item.price * item.quantityCart).toFixed(2) + " €"}
                        </Typography>
                    </Grid>
                
            </Grid>

                </Grid>
            </Grid>
            </CardContent>
        </Card>
    )
};


export default PaymentItem;

