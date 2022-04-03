import {Roca} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';

import Button from '@mui/material/Button';
import { Container } from '@mui/material';
type RocaListProps = {
  rocas: Roca[];
  handleAddToCart(r:Roca): void;
};
//a
function Catalogo(props: RocaListProps): JSX.Element {
  return (
    <>
      <List id="catalogo">
      {props.rocas.map((roca,index)=>{
        return (
          <div className="producto">

            <Grid item xs={12}>
              <img src={roca.img} style={{width:'100%'}} alt={roca.name.toString()}/>
            </Grid>

            <div className="infoProducto">

                <ListItemText primary={roca.price+"€"} className="datoProducto"/>
                <ListItemText primary={roca.type} className="datoProducto"/>
                <ListItemText primary={roca.mohsHardness} className="datoProducto"/>
                <ListItemText primary={roca.density} className="datoProducto"/>
            </div>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" style={{width:'100%'}} onClick={() => props.handleAddToCart(roca)} >Comprar</Button>
            </Grid>

          </div>
        )
      })}
      </List>
      
    </>
  );
}

export default Catalogo;
