import {Roca} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { Container } from '@mui/material';

type Props = {
    cartContent: Roca[];
};

const PaymentPage: React.FC<Props> = ({cartContent}) => {

        
    const getTotalPrice = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart * item.price, 0);
    
    return (
        <>
            <h2>Your BUYYYY</h2>
            {/*cartContent.size===0 ? <p>No items in the cart</p> : null*/}

            {/* {
                cartContent.map(roca => {
                    <div> 
                    <h3>{roca.name}</h3>
                    <h3>{roca.quantityCart}</h3>
                    <h3>{v*((rocas.find(roca => roca.name === k) as Roca).price as number)}</h3>
                    </div>


                })
            }
            {cartContent.forEach((v, k) => ( 
                <div> 
                <h3>{(rocas.find(roca => roca.name === k) as Roca).name}</h3>
                <h3>{v}</h3>
                <h3>{v*((rocas.find(roca => roca.name === k) as Roca).price as number)}</h3>
                </div>
            ))} */}
            
            // <h2>Cost (no iva): {  ((getTotalPrice() as number) - (getTotalPrice()*0.21)).toFixed(2) }€</h2>
            // <h2>Cost: {getTotalPrice().toFixed(2)}€</h2>

            // // Aqui cogemos la dir de los pods y sacamos los costes envio
            // <button type="button" className="btn btn-primary">

            // </button>
        </>
    )
};

export default PaymentPage;
