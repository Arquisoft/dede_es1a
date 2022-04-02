import {Roca} from '../shared/shareddtypes';
//Styles
import {Wrapper} from './Cart.styles';
import CartItem from './ItemsCart/ItemsCart';



type Props = {
    rocas: Roca[];
    cartContent: Map<String, number>;
    handleAddToCart: (selectedItem:Roca)=> void;
    handleRemoveFromCart: (selectedItem: Roca) => void;
};

const Cart:React.FC<Props> = ({rocas, cartContent, handleAddToCart, handleRemoveFromCart})=> {

    const getTotal = (cartContent: Map<String, number>) => 0.0;
    
    const getItems = (cartContent: Map<String, number>) => {
        for(let key in cartContent.keys()) {   
            let item = rocas.find((roca) => {roca.name === key}) as Roca;
            <CartItem 
                key={item.id}
                item={item}
                quantity = {cartContent.get(key)}
                handleAddToCart={handleAddToCart}
                handleRemoveFromCart={handleRemoveFromCart}
            />
        }
    }


    return (
        <Wrapper>
            <h3>Shopping Cart</h3>
            {cartContent.size===0 ? <p>No items in the cart</p>: null}
            { 

                
            }
            <h3>Total: {getTotal(cartContent).toFixed(2)}€</h3>               
           {  
               cartContent.length===0 ?
            <li key={0}>
        
            </li> :
            <li key={0}>
                <a className={'active'} href={href}>
                    {'Pagar'}
                </a>
            </li>
            }           
        </Wrapper>
    )
};

export default Cart;