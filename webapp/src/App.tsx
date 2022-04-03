import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Welcome from './components/Welcome';
import logo from './images/interfaz/logoRock.png';
import Title from './components/titleUtil';
import  {getUsers, getRocas} from './api/api';

import { createTheme, List } from '@mui/material';
import './css/App.css';
import ResponsiveAppBar from './components/navBar';

import {Roca, User} from './shared/shareddtypes';
import Catalogo from './components/Catalogo';
import { ThemeProvider } from '@emotion/react';
//import {createData} from "./code/insertExampleData"

import Drawer from '@material-ui/core/Drawer';
import ShoppingCart from './components/shoppingCart/ShoppingCart';
import { Wrapper, StyledButton } from './App.styles';
import Badge from '@material-ui/core/Badge';


function App(): JSX.Element {
  const [rocas,setRocas] = useState<Roca[]>([]);

  const refreshRocaList = async () => {
    setRocas(await getRocas());
  }

  // Shopping cart
  const [isCartOpen, setCartOpen] = useState(false);
  const[cartContent, setcartContent] = useState(new Map<String, number>());

  const getNofItemsCart = (cartContent: Map<String, number> ) => {
    let n = 0;
    for(let key in cartContent.keys()) {   
      n+= cartContent.get(key) as number;
    }
  }

  const handleAddToCart = (selectedItem: Roca) => {
    setcartContent(cart => {
      let quantity = cart.has(selectedItem.name) ? cart.get(selectedItem.name) as number : 0;

      cart.set(selectedItem.name, quantity+1);
      return cart;
    })
  };

  const handleRemoveFromCart = (selectedItem: Roca) => {
    setcartContent( cart=> {
      let quantity = cart.has(selectedItem.name) ? cart.get(selectedItem.name) as number : 0;

      if(quantity == 1) {
        cart.delete(selectedItem.name);
      } else {
        cart.set(selectedItem.name, quantity-1);
      }

      return cart;
    });

  };


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
      <Drawer anchor='right' open={isCartOpen} onClose={() => setCartOpen(false)}>
        <ShoppingCart 
          rocas={rocas} 
          cartContent={cartContent} 
          handleAddToCart={handleAddToCart} 
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Drawer>
      <Catalogo rocas={rocas} handleAddToCart={handleAddToCart}/>
    </ThemeProvider>
  );
}

export default App;
