import {Rock} from '../shared/shareddtypes';
import List from '@mui/material/List';
import Product from './Product';
import {Grid } from '@mui/material';
import RangeSlider from "./Rangeslider";
import BasicTextFieldWithOptions from "./TextFieldWithOptions";
import BasicTextField from "./TextField";
type RockListProps = {
  rocks: Rock[];
  handleAddToCart(rock:Rock): void;
};
//a
function Catalogo(rocks: RockListProps): JSX.Element {
  return (
    <>
      <Grid id="catalogFilter" container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
        <Grid item xs={12/3}>
          <RangeSlider max={0} min={100} valueName={'Mohs'}/>
        </Grid>
        <Grid item xs={12/3}>
          <RangeSlider max={0} min={100} valueName={'Densidad'}/>
        </Grid>
        <Grid item xs={12/3}>
          <RangeSlider max={0} min={100} valueName={'Precio'}/>
        </Grid>
        <Grid item xs={6}>
          <BasicTextFieldWithOptions values={["Metamorficas","Sedimentarias","Volcanicas"]} titleText={'Tipo de rocas'} helperText={'Selecciona el tipo de roca'}/>
        </Grid>
        <Grid item xs={6}>
          <BasicTextField label={'Nombre'} placeholder={'Ej: Cuarcita'}/>
        </Grid>
      </Grid>
      <List id="catalog">
      {rocks.rocks.map((rock,index)=>{
        return <Product product={rock} buyable={true} handleAddToCart={rocks.handleAddToCart}/>
      })}
      </List>
      
    </>
  );
}


export default Catalogo;
