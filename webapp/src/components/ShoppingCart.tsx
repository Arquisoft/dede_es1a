import { AppBar, Button, Grid, List } from '@mui/material';
import { Card, CardContent } from '@mui/material';
import { Rock } from '../shared/shareddtypes';
import CartItem from './CartItem';
import '../css/ShoppingCart.css';


type Props = {
    cartContent: Rock[];
    handleAddToCart: (selectedItem: Rock) => void;
    handleRemoveFromCart: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cartContent, handleAddToCart, handleRemoveFromCart }) => {
    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);
    const getTotalUds = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart, 0);

    return (
        <Card sx = {{width: '32em'}} className="cart" variant="outlined">
            <AppBar position='relative' className="title-cart">
                <h1>Mi carrito</h1>
            </AppBar>
            
            <List
                sx={{
                    width: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    height: '100%',
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
                >
                {[0].map((sectionId) => (
                    <li key={`section-${sectionId}`}>
                    <ul>
                    {cartContent.map(item => (
                    <CartItem 
                        key={item.id} 
                        item={item} 
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                    ))}
                    </ul>
                    </li>
                ))}
            </List>

            <Card  className="summary-cart">
                <div id="summary-labels">
                    <h3>Unidades: </h3>
                    <h2>Total: </h2>
                </div>
                <div id="summary-data">
                    <h3>{getTotalUds()}</h3>
                    <h2>{getTotalPrice().toFixed(2)} €</h2>
                </div>
            </Card>
                
            <Button
                size="medium"
                disableElevation
                variant="contained"
                disabled={cartContent.length<=0}
                onClick={() => { 
                    if(sessionStorage.getItem("userLogged"))
                        window.location.href = '/payment'; 
                    else
                        window.location.href = '/login'; 
                }}
            >
                Realizar Pedido
            </Button>
        </Card>
    )
};

export default Cart;