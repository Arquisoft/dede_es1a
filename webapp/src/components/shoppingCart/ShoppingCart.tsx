import e from 'express';
import { useEffect, useState } from 'react';
import { Roca } from '../../shared/shareddtypes';
import CartItem from './ItemsCart/CartItem';
import "./ShoppingCart.css"



type Props = {
    // TODO:cartContent: Map<String, number>;
    cartContent: Roca[];
    handleAddToCart: (selectedItem: Roca) => void;
    handleRemoveFromCart: (id: string) => void;
};

const Cart: React.FC<Props> = ({ cartContent, handleAddToCart, handleRemoveFromCart }) => {

    //TODO: const getTotal = (cartContent: Map<String, number>) => {
    //     var total = 0.0
    //     for (let key in cartContent.keys()) {
    //         let item = rocas.find(roca => roca.name === key) as Roca;
    //         total += (cartContent.get(key) as number) * (item.price as number);
    //     }
    //     return total;
    // }

    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);


    //TODO: const [cartItems, setCartItems] = useState<JSX.Element[]>([]);

    // const [cartItems2, setCartItems2] = useState<Roca[]>([]);

    // useEffect(() => {
    //     console.log("iter")
    //     setCartItems2([])
    //     for (var k in cartContent.keys()) {
    //         let p = (rocas.find(roca => roca.name === k) as Roca);
    //         p.quantityCart = (cartContent.get(k) as number);

    //         setCartItems2([...cartItems2,  p ]);
    //     }


    //     // cartContent.forEach((v, k) => {
    //     //     let p = (rocas.find(roca => roca.name === k) as Roca);
    //     //     p.quantityCart = v;

    //     //     setCartItems2([...cartItems2,  p ]);
    //     // }

        
    // }, [cartContent])

    // useEffect(() => {
    //     cartContent.forEach((v, k) => (
    //         setCartItems([...cartItems,
    //         <CartItem
    //             key={(rocas.find(roca => roca.name === k) as Roca).id}
    //             item={(rocas.find(roca => roca.name === k) as Roca)}
    //             quantity={v}
    //             handleAddToCart={handleAddToCart}
    //             handleRemoveFromCart={handleRemoveFromCart}
    //         />
    //         ])
            
    //     )
    //     )

    // }, [cartContent])

    // useEffect(() => {
    //     cartItems.map((v, k) => (
    //         console.log(v)
    //     )
    //     )
        

    // }, [cartItems])

    // const process = () => {
    //     setCartItems2([]);
    //     for (var k in cartContent.keys()) {
    //         let p = (rocas.find(roca => roca.name === k) as Roca);
    //         p.quantityCart = (cartContent.get(k) as number);

    //         setCartItems2([...cartItems2,  p ]);
    //     }
    // }

    // const check = (cartContent: Map<String, number>) => {
    //     let a = "";
    //     cartContent.forEach((v, k) => (
    //         a += (rocas.find(roca => roca.name === k) as Roca).name + " " + v + "\n"
    //     ))
    //     console.log(a)
    // }

    const check2 = (cartContent: Roca[]) => {
        let a = "";
        cartContent.forEach((v, k) => ( a += (v.name + " " + v.quantityCart + "\n") ));
        console.log(a);
        
    }


    return (
        <div className='shoppingCart'>
            <h2 id='title-cart'>Shopping Cart</h2>
            {/* TODO:{cartContent.size === 0 ? <p>No items in the cart</p> : null}
            {check2(cartItems2)} */}
            {cartContent.length === 0 ? <p>No items in the cart</p> : null}
            {check2(cartContent)}
            {/* {process()} */}

            <div className="items-cart">
                {cartContent.map(item => (
                <CartItem 
                    key={item.id} 
                    item={item} 
                    handleAddToCart={handleAddToCart}
                    handleRemoveFromCart={handleRemoveFromCart}
                />
                ))}
                <h2>Total: {getTotalPrice().toFixed(2)} €</h2>
            </div>

            {/* <div id="items-cart">{
                cartItems2.map((roca) => (
                    <CartItem
                        key={roca.id}
                        item={roca}
                        quantity={roca.quantityCart}
                        handleAddToCart={handleAddToCart}
                        handleRemoveFromCart={handleRemoveFromCart}
                    />
                )
                )}
            </div> */}
            
            {/* <div id='price-cart'>
                <h2>Total: {getTotal(cartContent).toFixed(2)}€</h2>
            </div> */}
            

            {/* {  
            cartContent.size===0 ?
            <li key={0}> </li> : //if cart empty no pay buttons
            <li key={0}>
                <a className={'active'} href={}> {'Pay'} </a>
            </li>
            }            */}
            
            <a id='pay-button' href={''}> {'Pay'} </a>
           
        </div>
    )
};

export default Cart;