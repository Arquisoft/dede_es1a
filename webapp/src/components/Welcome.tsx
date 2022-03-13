import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../logoRock.png';
import rockImg from '../rocksWelcome.jpg';
import { Button } from '@mui/material';

type WelcomeProps = {
  message: string;
}

function Welcome(props: WelcomeProps): JSX.Element {

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box component="h2">Bienvenidos a {props.message}</Box>
        <Button variant="contained" type="submit" sx={{ my: 2 }}>Iniciar Sesion</Button>
        <Button variant="contained" type="submit" sx={{ my: 2 }}>Registrate</Button>
      </Grid>
      <Grid item xs={20}>
        <img src={logo} className="App-logo" alt="logo" />
      </Grid>
      
    </Grid>
    
  );
}

export default Welcome;