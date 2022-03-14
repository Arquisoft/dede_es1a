import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Welcome from './components/Welcome';
import logo from './images/interfaz/logoRock.png';
import Title from './components/titleUtil';
import  {getUsers, getRocas} from './api/api';

import { createTheme } from '@mui/material';
import './css/App.css';
import ResponsiveAppBar from './components/navBar';

import {Roca, User} from './shared/shareddtypes';
import Catalogo from './components/Catalogo';
import { ThemeProvider } from '@emotion/react';

import {createData} from "./code/insertExampleData"

function App(): JSX.Element {
  const [rocas,setRocas] = useState<Roca[]>();

  const refreshRocaList = async () => {
    setRocas(await getRocas());
  }

  useEffect(()=>{
    refreshRocaList();
  },[]);

  const theme = createTheme({
    palette: {
      primary: {
        light: '#f3af2f',
        main: '#f3af2f',
        dark: '#553311',
        contrastText: '#111',
      },
      secondary: {
        light: '#ff7961',
        main: '#f44336',
        dark: '#ba000d',
        contrastText: '#000',
      },
      
    },
  });
  
  return (
    <ThemeProvider theme={theme}>

      <ResponsiveAppBar/>
      <Welcome message="ASW students"/>
      <Catalogo rocas={rocas}/>
      
    </ThemeProvider>
  );
}

export default App;
