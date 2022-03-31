import {Rock} from '../shared/shareddtypes';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
type RockListProps = {
  rocks: Rock[];
};
//a
function Catalogo(rocks: RockListProps): JSX.Element {
  return (
    <>
      <List id="catalogo">
      {rocks.rocks.map((rock,index)=>{
        return (
          <div className="producto">

            <Grid item xs={12}>
              <img src={rock.img} style={{width:'100%'}} alt={rock.name.toString()}/>
            </Grid>

            <div className="infoProducto">

                <ListItemText primary={rock.price+"€"} className="datoProducto"/>
                <ListItemText primary={rock.type} className="datoProducto"/>
                <ListItemText primary={rock.mohsHardness} className="datoProducto"/>
                <ListItemText primary={rock.density} className="datoProducto"/>
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
