import {Roca} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { Container } from '@mui/material';

type Props = {
  rocas: Roca[];
  cartContent: Map<String, number>;
};

const PaymentPage: React.FC<Props> = ({rocas, cartContent}) => {
    
        const getTotal = (cartContent: Map<String, number>) => {
            var total = 0.0
            for(let key in cartContent.keys()) {   
                let item = rocas.find(roca => roca.name === key) as Roca;
                total += (cartContent.get(key) as number) * (item.price as number);
            }
            return total;
        }

        return (
            <>
                <h2>Your BUYYYY</h2>
                {cartContent.size===0 ? <p>No items in the cart</p> : null}

                {cartContent.forEach((v, k) => ( 
                    <div> 
                    <h3>{(rocas.find(roca => roca.name === k) as Roca).name}</h3>
                    <h3>{v}</h3>
                    <h3>{v*((rocas.find(roca => roca.name === k) as Roca).price as number)}</h3>
                    </div>
                ))}
                
                <h2>Cost (no iva): {  ((getTotal(cartContent) as number) - (getTotal(cartContent)*0.21)).toFixed(2) }€</h2>
                <h2>Cost: {getTotal(cartContent).toFixed(2)}€</h2>

                    // Aqui cogemos la dir de los pods y sacamos los costes envio
                <button type="button" className="btn btn-primary">

                </button>
            </>
        )
    };

export default PaymentPage;
