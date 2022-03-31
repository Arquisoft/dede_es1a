import {Rock} from '../shared/shareddtypes';
import List from '@mui/material/List';
import Product from './Product';
type RockListProps = {
  rocks: Rock[];
};
//a
function Catalogo(rocks: RockListProps): JSX.Element {
  return (
    <>
      <List id="catalogo">
      {rocks.rocks.map((rock,index)=>{
        return <Product rock={rock}/>
      })}
      </List>
      
    </>
  );
}

export default Catalogo;
