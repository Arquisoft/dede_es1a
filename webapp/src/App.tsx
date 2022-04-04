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

import { createTheme, Drawer, List } from '@mui/material';
import './css/App.css';
import ResponsiveAppBar from './components/navBar';

import {Roca, User} from './shared/shareddtypes';
import Catalogo from './components/Catalogo';
import { ThemeProvider } from '@emotion/react';
//import {createData} from "./code/insertExampleData"

import ShoppingCart from './components/shoppingCart/ShoppingCart';
import PaymentPage from './components/PaymentPage';


function App(): JSX.Element {
  const [rocas,setRocas] = useState<Roca[]>([]);

  const refreshRocaList = async () => {
    setRocas(await getRocas());
  }

  // Shopping cart
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartContent,setCartContent] = useState<Roca[]>([]);

  const getNofItemsCart = () => cartContent.reduce((sum: number, item) => sum + item.quantityCart, 0);

  const handleAddToCart = (selectedItem: Roca) => {
      setCartContent(cart => {
        if (cart.find(rocaInCart => rocaInCart.name === selectedItem.name)) {
            return cart.map(roca => ( roca.name === selectedItem.name ? 
                { ...roca, quantityCart: roca.quantityCart + 1 } : 
                roca
            ));
        }
        return [...cart, {...selectedItem, quantityCart: 1}];
    });
    console.log("añadido");
    console.log(cartContent);
  };

  const handleRemoveFromCart = (name: string) => {
    setCartContent(cart => (
      cart.reduce((sum, p) => {
          if (p.name === name) {
              if (p.quantityCart === 1) {
                  return sum;
              }
              return [...sum, {...p, quantityCart: p.quantityCart - 1}];
          } else {
              return [...sum, p];
          }
      }, [] as Roca[])
    ));
  
    console.log("quitado");
    console.log(cartContent);

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
      <ResponsiveAppBar openCart={()=>setCartOpen(true)}/>
      <Welcome message="ASW students"/>
      {/* <PaymentPage>
        cartContent={cartContent} 
      </PaymentPage> */}
      <Drawer anchor='right' open={isCartOpen} onClose={() => setCartOpen(false)}>
        <ShoppingCart 
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
