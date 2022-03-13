import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../logoRock.png';
import rockImg from '../rocksWelcome.jpg';


function RockImg(): JSX.Element {

  return (
    <Grid container>
      <Grid item xs={12}>
        <img src={rockImg}/>
      </Grid>
      
    </Grid>
    
  );
}

export default RockImg;