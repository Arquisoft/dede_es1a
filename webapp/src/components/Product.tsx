import {Rock} from '../shared/shareddtypes';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
type ProductProps = {
  product: Rock |null;
  buyable:boolean;
};
//a
function Product(product: ProductProps): JSX.Element {
  return (
      <div className="product">
          <div className='imageProductContainer'>
          {product.product!==null ?
              <>
              <img src={product.product.img} style={{width:'100%'}} alt={product.product.name.toString()}/>
              </>
              : <></>
            }
            
          </div>

          <div className="infoProduct">
              {product.product!==null ?
              <>
              
              <p className="datoProduct">{"precio: "+product.product.price+"€"}</p>
              <p className="datoProduct">{"tipo: "+ product.product.type}</p>
              <p className="datoProduct">{"mohs: "+ product.product.mohsHardness}</p>
              <p className="datoProduct">{"densidad: "+product.product.density}</p>
              </>
              : <></>
            }
              
          </div>
          <Button variant="contained" className='btnBuy' color="primary" style={{width:'100%'}}>Comprar</Button>
      </div>
  );
}

export default Product;
