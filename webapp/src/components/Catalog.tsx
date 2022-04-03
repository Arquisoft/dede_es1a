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
      <List id="catalog">
      {rocks.rocks.map((rock,index)=>{
        return <Product product={rock} buyable={true} />
      })}
      </List>
      
    </>
  );
}

export default Catalogo;
