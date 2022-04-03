import e from 'express';
import {Roca} from '../../shared/shareddtypes';
import CartItem from './ItemsCart/CartItem';



type Props = {
    rocas: Roca[];
    cartContent: Map<String, number>;
    handleAddToCart: (selectedItem:Roca)=> void;
    handleRemoveFromCart: (selectedItem: Roca) => void;
};

const Cart:React.FC<Props> = ({rocas, cartContent, handleAddToCart, handleRemoveFromCart})=> {

    const getTotal = (cartContent: Map<String, number>) => {
        var total = 0.0
        for(let key in cartContent.keys()) {   
            let item = rocas.find(roca => roca.name === key) as Roca;
            total += (cartContent.get(key) as number) * (item.price as number);
        }
        return total;
    }
    
    const getItems = (cartContent: Map<String, number>) => {
        // for(let key in cartContent.keys()) {   
        //     let item = rocas.find(roca => roca.name === key) as Roca;
        //     <CartItem 
        //         key={item.id}
        //         item={item}
        //         quantity = {cartContent.get(key) as number} 
        //         handleAddToCart={handleAddToCart}
        //         handleRemoveFromCart={handleRemoveFromCart}
        //     />
        // }
        let a = "";
        cartContent.forEach((v, k) => ( 
            a += (rocas.find(roca => roca.name === k) as Roca).name+" "+v +"\n"
            ))
        console.log(cartContent)
    }

    const getNofItemsCart = (cartContent: Map<String, number> ) => {
        let n = 0;
        for(let key in cartContent.keys()) {   
          n += cartContent.get(key) as number;
        }
        return n;
      }

    return (
        <>
            <h2>Shopping Cart</h2>
            {getNofItemsCart(cartContent)===0 ? <p>No items in the cart</p>: null}
            {getItems(cartContent)}
            
            {cartContent.forEach((v, k) => ( 
                <CartItem 
                    key={(rocas.find(roca => roca.name === k) as Roca).id}
                    item={(rocas.find(roca => roca.name === k) as Roca)}
                    quantity = {v} 
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
            ))}
        


            <h2>Total: {getTotal(cartContent).toFixed(2)}€</h2>  
            {/* {  
            cartContent.size===0 ?
            <li key={0}> </li> : //if cart empty no pay buttons
            <li key={0}>
                <a className={'active'} href={}> {'Pay'} </a>
            </li>
            }            */}
            <li key={0}>
                <a className={'active'} href={'pay-page'}> {'Pay'} </a>
            </li>
        </>
    )
};

export default Cart;