
import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import React, { useState } from "react";
import ResponsiveAppBar from "./navBar";
import logo from '../images/interfaz/logoRock.png';
import Title from "./titleUtil";
type FromElement = React.FormEvent<HTMLFormElement>;
interface ITask {
  name: string;
  done: boolean;
}
type WelcomeProps = {
  message: string;
};

function Welcome(props: WelcomeProps): JSX.Element {
  return (
    <>
      
      <Container maxWidth="sm" className="principal">
        <Title/>
        <Grid item xs={12} >
          <Box className="logoClass"><img src={logo} className="App-logo" alt="logo" /></Box>
        </Grid>
      </Container>
    </>
  );
}

export default Welcome;
