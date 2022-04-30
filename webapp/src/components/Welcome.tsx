import logo from '../images/interfaz/logoRock.png';
import Showcases from "./Showcases";
import { Rock } from "../shared/shareddtypes";

type RockListProps = {
  handleAddToCart(r:Rock): void;
};

function Welcome(prefilteredbox: RockListProps): JSX.Element {

  
  return (
    <>
      <div id="App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      
      <div>
        <Showcases handleAddToCart={prefilteredbox.handleAddToCart} />
      </div>
    </>
  );
}

export default Welcome;