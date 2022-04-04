import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Roca } from '../../../shared/shareddtypes';
import './CartItem.css'

type Props = {
    item: Roca;
    handleAddToCart: (selectedItem: Roca) => void;
    handleRemoveFromCart: (id: string) => void;
}


const CartItem: React.FC<Props> = ({item, handleAddToCart, handleRemoveFromCart}) => {
    
    return (
    <Card className="cartItem-ci" sx={{ maxWidth: 500 } }>
        <CardContent>
            <Typography variant="h5">
                {item.name}
            </Typography>
            <div className="quantityController-ci">  
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => handleRemoveFromCart(item.name)}
                >-</Button>
                <Typography id="quantity-ci">
                {item.quantityCart + " uds " }
                </Typography>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    onClick={() => handleAddToCart(item)}
                >+</Button>
            </div>
            <Typography id="quantity-ci">
                {(item.price * item.quantityCart).toFixed(2) + " €"}
            </Typography>
        </CardContent>
        <CardMedia
            className = "img-ci"
            component="img"
            sx={{ width: 120, maxWidth: 120 }}
            image={item.img}
            alt={item.name}
        />
    </Card>


    )
};


export default CartItem;

