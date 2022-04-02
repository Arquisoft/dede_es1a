import Button from '@material-ui/core/Button';
import { Roca } from '../../shared/shareddtypes';

//Styles
import {Wrapper} from './ItemsCart.styles';


type Props = {
    item: Roca;
    quantity: number
    handleAddToCart: (selectedItem: Roca) => void;
    handleRemoveFromCart: (selectedItem: Roca) => void;
}


const CartItem: React.FC<Props> = ({item, quantity, handleAddToCart, handleRemoveFromCart}) => (
    
    <Wrapper>
        <div>
            <h4>{item.name}</h4>
            <div className="price">
                <p>Price: €{item.price} </p>
                <p>Total: €{(quantity * (item.price as number)).toFixed(2)}</p>
            </div>
            <div className="menuButtons">
                <Button
                    variant='contained'
                    size = 'small'
                    disableElevation
                    onClick={()=>handleRemoveFromCart(item)}
                    >
                    -
                </Button>
                
                <p>{quantity}</p>
                <Button
                    variant='contained'
                    size = 'small'
                    disableElevation
                    onClick={()=>handleAddToCart(item)}
                    >
                    +
                </Button>
            </div>
        </div>
        <img src={item.img}/>
    </Wrapper>
)

export default CartItem;

