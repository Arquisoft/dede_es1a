import { Rock } from '../shared/shareddtypes';
import Button from '@mui/material/Button';
import { Card, CardActionArea, CardContent, CardMedia, Grid, Paper, Typography } from '@mui/material';
type ProductProps = {
  product: Rock | null;
  buyable: boolean;
  handleAddToCart(r: Rock): void;
};

//a
function Product(product: ProductProps): JSX.Element {
  return (
    
    <Card className="product">
      <CardActionArea>
        <CardMedia component="img"
          height="200"
          image={product.product?.img}
          alt={product.product?.name}
        />
        </CardActionArea >
        <CardContent>
          {product.product !== null ?

            <Grid container spacing={3} >
              <Grid item xs={12}>
                <Paper elevation={3} className='productDataContainer' />
                <Typography className='productDataText'>{"Nombre: " + product.product.name}</Typography>
                <Paper />
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} className='productDataContainer' />
                <Typography className='productDataText'>{"Precio: " + product.product.price}</Typography>
                <Paper />
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} className='productDataContainer' />
                <Typography className='productDataText'>{"Densidad: " + product.product.density}</Typography>
                <Paper />
              </Grid>
              <Grid item xs={6}>
                <Paper className='productDataContainer' elevation={3} />
                <Typography className='productDataText'>{"Mohs: " + product.product.mohsHardness}
                </Typography>
                <Paper />
              </Grid>
              <Grid item xs={6}>
                <Paper elevation={3} className='productDataContainer' />
                <Typography className='productDataText'> {"Tipo: " + product.product.type[0].toLocaleUpperCase()+product.product.type.substring(1,product.product.type.length)}</Typography>
                <Paper />
              </Grid>
            </Grid>

            : <></>
          }



      
      <Button
        variant="contained"
        className='btnBuy'
        color="primary"
        style={{ width: '100%' }}
        onClick={() => product.handleAddToCart(product.product as Rock)}>
        Comprar</Button>
        </CardContent>
        
    </Card >
    
  );
}

export default Product;
