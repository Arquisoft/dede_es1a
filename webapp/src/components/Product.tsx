import {Rock} from '../shared/shareddtypes';
import Button from '@mui/material/Button';
import { Grid, Paper, Typography } from '@mui/material';
type ProductProps = {
  product: Rock |null;
  buyable:boolean;
  handleAddToCart(r:Rock): void;
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
          <div>
              
              {product.product!==null ?
              <Grid container spacing={2} >
              
                <Grid item xs={12}>
                  <Paper elevation={3} sx={{
                    bgcolor: 'background.default',
                    height:'2em'
                  }}/>
                  <Typography mt={-3.3}></Typography>
                  {"nombre: "+product.product.name}
                  <Paper />
                  
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{
                    bgcolor: 'background.default',
                    height:'2em'
                  }}/>
                  <Typography mt={-3.3}></Typography>
                  {"nombre: "+product.product.name}
                  <Paper />
                  
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{
                    bgcolor: 'background.default',
                    height:'2em'
                  }}/>
                  <Typography mt={-3.3}></Typography>
                  {"nombre: "+product.product.name}
                  <Paper />
                  
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{
                    bgcolor: 'background.default',
                    height:'2em'
                  }}/>
                  <Typography mt={-3.3}></Typography>
                  {"nombre: "+product.product.name}
                  <Paper />
                  
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={3} sx={{
                    bgcolor: 'background.default',
                    height:'2em'
                  }}/>
                  <Typography mt={-3.3}></Typography>
                  {"nombre: "+product.product.name}
                  <Paper />
                  
                </Grid>
              
              </Grid>
              : <></>
            }
              
          </div>
          <Button 
            variant="contained" 
            className='btnBuy' 
            color="primary" 
            style={{width:'100%'}}
            onClick={() => product.handleAddToCart(product.product as Rock)}>
          Comprar</Button>
      </div>
  );
}

export default Product;
