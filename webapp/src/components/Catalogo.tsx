import {Roca} from '../shared/shareddtypes';
import List from '@mui/material/List';

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import Grid from '@mui/material/Grid';
import Item from '@mui/material/ListItem';
import Button from '@mui/material/Button';

type RocaListProps = {
  rocas: Roca[];
};

function Catalogo(rocas: RocaListProps): JSX.Element {
  return (
    <>
      <List>

      {rocas.rocas.map((roca,index)=>{
        return (
          <Grid container  key={roca.id} >
            <Grid item xs={12}>
              <img src="./../images/minerales/gneiss.jpg" style={{width:'100%'}}/>
              </Grid>
              <Grid item xs={6}>
                <ListItemText primary={roca.precio+"$"} />
              </Grid>
              <Grid item xs={6}>
                <ListItemText primary={roca.Tipo}/>
              </Grid>
              <Grid item xs={6}>
                <ListItemText primary={roca.durezaMohs}/>
              </Grid>
              <Grid item xs={6}>
                <ListItemText primary={roca.rugosidad}/>
              </Grid>
              <Grid item xs={12}>
              <Button variant="contained" style={{width:'100%'}}>Comprar</Button>
              </Grid>
              
            </Grid>
        )
      })}
      </List>
      
    </>
  );
}

export default Catalogo;
