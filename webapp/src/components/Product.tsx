import {Rock} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
type ProductProps = {
  rock: Rock;
};
//a
function Product(rock: ProductProps): JSX.Element {
  return (
    <>
        <div className="infoProducto">

            <ListItemText primary={rock.rock.price+"€"} className="datoProducto"/>
            <ListItemText primary={rock.rock.type} className="datoProducto"/>
            <ListItemText primary={rock.rock.mohsHardness} className="datoProducto"/>
            <ListItemText primary={rock.rock.density} className="datoProducto"/>
        </div>
    </>
  );
}

export default Product;
