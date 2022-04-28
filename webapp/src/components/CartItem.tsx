import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Card, CardContent, CardMedia } from '@mui/material';
import { Rock } from '../shared/shareddtypes';
import '../css/CartItem.css';

type Props = {
    item: Rock;
    handleAddToCart: (selectedItem: Rock) => void;
    handleRemoveFromCart: (id: string) => void;
}

const CartItem: React.FC<Props> = ({item, handleAddToCart, handleRemoveFromCart}) => {
    return (
    <Card className="cartItem-ci" sx={{ maxWidth: 450 } }>
        <CardMedia
            className = "img-ci"
            component="img"
            sx={{ width: 150, maxWidth: 150 }}
            image={item.img}
            alt={item.name}
        />
        <CardContent>
            <Typography className='name-ci' variant="h5"> {item.name} </Typography>
            <div className="quantityController-ci">  
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    color="primary" 
                    onClick={() => handleRemoveFromCart(item.name)}
                >-</Button>
                <Typography id="quantity-ci" variant="h6"> 
                    {item.quantityCart + " uds" }
                </Typography>
                <Button
                    size="small"
                    disableElevation
                    variant="contained"
                    color="primary" 
                    onClick={() => handleAddToCart(item)}
                >+</Button>
            </div>
            <Typography id="quantity-ci" variant="h6">
                {(item.price * item.quantityCart).toFixed(2) + " €"}
            </Typography>
        </CardContent>
        
    </Card>

    )
};


export default CartItem;

