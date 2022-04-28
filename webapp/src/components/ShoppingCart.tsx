import { Button, Grid } from '@mui/material';
import { Rock } from '../shared/shareddtypes';
import CartItem from './CartItem';
import '../css/ShoppingCart.css';
import LoginPod from './solid-pods/LoginPod';
import {useNavigate} from 'react-router-dom';


type Props = {
    cartContent: Rock[];
    handleAddToCart: (selectedItem: Rock) => void;
    handleRemoveFromCart: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cartContent, handleAddToCart, handleRemoveFromCart }) => {
    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);

    return (
        <Grid sx = {{width: 500}}>
            <h1 id='title-cart'>Mi carrito</h1>
            {cartContent.length === 0 ? <h3>El carrito está vacío</h3> : null}
            
            <div className="items-cart">
                {cartContent.map(item => (
                <CartItem 
                    key={item.id} 
                    item={item} 
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
                ))}
                <h2 id="price-cart">Total (iva 21% incluido): {getTotalPrice().toFixed(2)} €</h2>
            </div>

            <Button
                size="medium"
                disableElevation
                variant="contained"
                disabled={cartContent.length<=0}
                onClick={() => { 
                    // if(localStorage.getItem('token'))
                    if(sessionStorage.getItem("userLogged"))
                        window.location.href = '/payment'; 
                    else
                        window.location.href = '/login'; 
                }}
            >
                Realizar Pedido
            </Button>

            

        </Grid>
    )
};

export default Cart;