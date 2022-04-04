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
              
              <ListItemText primary={"precio: "+product.product.price+"€"} className="datoProduct"/>
              <ListItemText primary={"tipo: "+ product.product.type} className="datoProduct"/>
              <ListItemText primary={"mohs: "+ product.product.mohsHardness} className="datoProduct"/>
              <ListItemText primary={"densidad: "+product.product.density} className="datoProduct"/>
              </>
              : <></>
            }
              
          </div>
          <Grid item xs={12} hidden={!product.buyable}>
            <Button variant="contained" color="primary" style={{width:'100%'}}>Comprar</Button>
          </Grid>
      </div>
  );
}

export default Product;
