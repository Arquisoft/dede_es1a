import Grid from '@mui/material/Grid';
import title from '../images/interfaz/title.png';

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