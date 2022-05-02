import logo from "../images/interfaz/logoRock.png";
import Showcases from "./Showcases";
import { Rock } from "../shared/shareddtypes";
import { Typography } from "@mui/material";

type RockListProps = {
  handleAddToCart(r: Rock): void;
};

function Welcome(prefilteredbox: RockListProps): JSX.Element {
  return (
    <>
      <div id="App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />

          <Typography variant="h1" className="text animated pulse">Bienvenido a Rock-Shop</Typography>

      </div>

      <div>
        <Showcases handleAddToCart={prefilteredbox.handleAddToCart} />
      </div>
    </>
  );
}

export default Welcome;
