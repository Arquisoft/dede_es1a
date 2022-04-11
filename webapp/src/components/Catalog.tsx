import {Rock} from '../shared/shareddtypes';
import List from '@mui/material/List';
import Product from './Product';

type RockListProps = {
  rocks: Rock[];
  handleAddToCart(rock:Rock): void;
};
//a
function Catalogo(rocks: RockListProps): JSX.Element {
  return (
    <>
      <List id="catalog">
      {rocks.rocks.map((rock,index)=>{
        return <Product product={rock} buyable={true} handleAddToCart={rocks.handleAddToCart}/>
      })}
      </List>
      
    </>
  );
}

export default Catalogo;
