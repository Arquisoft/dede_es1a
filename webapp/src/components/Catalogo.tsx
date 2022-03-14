import {Roca} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Container } from '@mui/material';
type RocaListProps = {
  rocas: Roca[];
};

function Catalogo(rocas: RocaListProps): JSX.Element {
  return (
    <>
      <List id="catalogo">
      {rocas.rocas.map((roca,index)=>{
        return (
          <div className="producto">

            <Grid item xs={12}>
              <img src="./../images/minerales/gneiss.jpg" style={{width:'100%'}} alt={roca.name.toString()}/>
            </Grid>

            <div className="infoProducto">

                <ListItemText primary={roca.precio+"$"} className="datoProducto"/>
                <ListItemText primary={roca.Tipo} className="datoProducto"/>
                <ListItemText primary={roca.durezaMohs} className="datoProducto"/>
                <ListItemText primary={roca.rugosidad} className="datoProducto"/>
            </div>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" style={{width:'100%'}}>Comprar</Button>
            </Grid>

          </div>
        )
      })}
      </List>
      
    </>
  );
}

export default Catalogo;
