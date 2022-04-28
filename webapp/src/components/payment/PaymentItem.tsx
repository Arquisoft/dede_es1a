import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Rock } from '../../shared/shareddtypes';
import '../../css/CartItem.css';

type Props = {
    item: Rock;
}

const PaymentItem: React.FC<Props> = ({item}) => {
    return (
        <Card className="cartItem-ci" sx={{ maxWidth: 500 } }>
            <CardContent>
                <CardMedia
                    className = "img-ci"
                    component="img"
                    sx={{ width: 120, maxWidth: 120 }}
                    image={item.img}
                    alt={item.name}
                />
                <Typography variant="h5">
                    {item.name}
                </Typography>
                
                <Typography id="price-ci">
                    {(item.price).toFixed(2) + " €"}
                </Typography>

                <Typography id="quantity-ci">
                    {item.quantityCart + " uds " }
                </Typography>

                <Typography id="price-ci">
                    {(item.price * item.quantityCart).toFixed(2) + " €"}
                </Typography>
            </CardContent>
        </Card>
    )
};


export default PaymentItem;

