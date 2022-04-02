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

import { createTheme } from '@mui/material';
import './css/App.css';
import ResponsiveAppBar from './components/navBar';

import {Roca, User} from './shared/shareddtypes';
import Catalogo from './components/Catalogo';
import { ThemeProvider } from '@emotion/react';
//import {createData} from "./code/insertExampleData"

function App(): JSX.Element {
  const [rocas,setRocas] = useState<Roca[]>([]);

  const refreshRocaList = async () => {
    setRocas(await getRocas());
  }

  // Shopping cart
  const [isCartOpen, setCartOpen] = useState(false);

  const[cartItems, setCartItems] = useState(new Map<String, number>());
  const[nOfCartItems, setNofCartItems] = useState(0);

  const {data, isLoading, error} = useQuery<Roca[]>('rocas', getRocas);
  
  const handleAddToCart = (selectedItem: Roca) => {
    setCartItems(cart => {
      let quantity = cart.has(selectedItem.name) ? cart.get(selectedItem.name) as number : 0;

      cart.set(selectedItem.name, quantity+1);
      return cart;
      
    })
  };

  const handleRemoveFromCart = (selectedItem: Roca) => {
    setCartItems( cart=> {
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
      <Drawer anchor='right' open={isCartOpen} onClose={() => setCartOpen(false)}>
          <Cart
            cartItems={cartItems}
            addToCart={handleAddToCart}
            removeFromCart={handleRemoveFromCart}
          />
        </Drawer>
      <Welcome message="ASW students"/>
      <Catalogo rocas={rocas}/>
    </ThemeProvider>
  );
}

export default App;
