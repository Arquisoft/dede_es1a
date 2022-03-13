import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../logoRock.png';
import rockImg from '../rocksWelcome.jpg';

type WelcomeProps = {
  message: string;
}

function Welcome(props: WelcomeProps): JSX.Element {

  return (
    <Grid container>
      <Grid item xs={12}>
        <Box component="h2">Bienvenidos a {props.message}</Box>
      </Grid>
      <Grid item xs={12}>
        <img src={logo} className="App-logo" alt="logo" />
      </Grid>
      
    </Grid>
    
  );
}

export default Welcome;