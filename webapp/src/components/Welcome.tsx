
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import logo from '../images/interfaz/logoRock.png';
import Showcases from "./Showcases";

function Welcome(): JSX.Element {

  
  return (
    <>
      <div id="App-logo-container">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      
      <div id="showcases">
        <Showcases />
      </div>
    </>
  );
}

export default Welcome;