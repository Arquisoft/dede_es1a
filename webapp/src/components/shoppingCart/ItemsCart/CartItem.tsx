import Button from '@material-ui/core/Button';
import { Roca } from '../../../shared/shareddtypes';
import './CartItem.css'

type Props = {
    item: Roca;
    handleAddToCart: (selectedItem: Roca) => void;
    // TODO: handleRemoveFromCart: (selectedItem: Roca) => void;
    handleRemoveFromCart: (id: string) => void;
}


const CartItem: React.FC<Props> = ({item, handleAddToCart, handleRemoveFromCart}) => {
    
    return (
        <div className="cartItem-ci">
            <h3 id='name-ci'>{item.name}</h3>
            <div className="menu-ci">
                <Button
                    id="buttonR-ci"
                    variant='contained'
                    size = 'small'
                    disableElevation
                    onClick={()=>handleRemoveFromCart(item.name)}
                    >
                    -
                </Button>
                
                <p id="quantity-ci">{item.quantityCart}</p>

                <Button 
                    id="buttonS-ci"
                    variant='contained'
                    size = 'small'
                    disableElevation
                    onClick={()=>handleAddToCart(item)}
                    >
                    +
                </Button>
            </div>
            <img id="img-ci" src={item.img}/>
        </div>
    )
};


export default CartItem;

