
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import ResponsiveAppBar from "./navBar";
import logo from '../images/interfaz/logoRock.png';
import Title from "./titleUtil";
import Showcases from "./Showcases";

function Welcome(): JSX.Element {

  
  return (
    <>
      
      <Container maxWidth="sm" className="principal">
        <Title/>
        <Grid item xs={12} >
          <Box className="logoClass"><img src={logo} className="App-logo" alt="logo" /></Box>
        </Grid>
        <div id="showcases">
        <Showcases />
        </div>
      </Container>
    </>
  );
}

export default Welcome;