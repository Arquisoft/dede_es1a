import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import logo from '../logoRock.png';
import rockImg from '../rocksWelcome.jpg';
import title from '../title.png';

function Title(): JSX.Element {

  return (
    <Grid container>
      <Grid className='titulo' item xs={12}>
        <img src={title}/>
      </Grid>
      
    </Grid>
    
  );
}
export default Title;