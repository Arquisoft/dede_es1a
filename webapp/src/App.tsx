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
import PaymentPage from './components/paymentPage/PaymentPage';
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import { ContentCopy } from '@mui/icons-material';


function App(): JSX.Element {
  const [rocas,setRocas] = useState<Roca[]>([]);

  const refreshRocaList = async () => {
    setRocas(await getRocas());
  }

  // Shopping cart
  const [isNewCart, setNewCart] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartContent,setCartContent] = useState<Roca[]>([]);

  useEffect(() => {
    if(isNewCart) {
      resetCart();
      setNewCart(false);
      return;
    }
    const memoryCart = localStorage.getItem("cart");
    if (memoryCart) {
      let cart: Roca[] = JSON.parse(memoryCart);
      setCartContent(cart); 
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [isNewCart]);

  const resetCart = () => {
    setCartContent([]);
    localStorage.setItem("cart", JSON.stringify([]));
    setCartContent([]);
  };

  const handleAddToCart = (selectedItem: Roca) => {
    localStorage.setItem("cart", JSON.stringify(cartContent));
      setCartContent(cart => {
        if (cart.find(rocaInCart => rocaInCart.name === selectedItem.name)) {
            // return cart.map(roca => ( 
            //   roca.name === selectedItem.name ? 
            //     { ...roca, quantityCart: roca.quantityCart + 1 } : 
            //     roca
            // ));
            var tempCart= cart.map(roca=>(
              roca.name === selectedItem.name ? 
              { ...roca, quantityCart: roca.quantityCart + 1 } : 
              roca
            ));
            return tempCart;
        }
        // return [...cart, {...selectedItem, quantityCart: 1}];
        var tempCart= [...cart, {...selectedItem, quantityCart:1}];
        return tempCart;
    });
  };

  const handleRemoveFromCart = (name: string) => {
    localStorage.setItem("cart", JSON.stringify(cartContent));
    setCartContent(cart => (
      cart.reduce((sum, p) => {
          if (p.name === name) {
              if (p.quantityCart === 1) {
                  return sum;
              }
              // return [...sum, {...p, quantityCart: p.quantityCart - 1}];
              var tempCart= [...sum, {...p, quantityCart:p.quantityCart - 1}]
              return tempCart;
          } else {
              // return [...sum, p];
              var tempCart= [...sum, p];
              return tempCart;
          }
      }, [] as Roca[])
    ));
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
      
      <Router>
        <Routes>
          <Route path="/home" element={<Welcome message="ASW students"/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/catalog" element={<Catalogo rocas={rocas} handleAddToCart={handleAddToCart}/>}/>
          <Route path="/payment" element={<PaymentPage cartContent={cartContent} setNewCart={setNewCart} />}/>
        </Routes>
      </Router>

      <Drawer anchor='right' open={isCartOpen} onClose={() => setCartOpen(false)}>
        <ShoppingCart 
          cartContent={cartContent} 
          handleAddToCart={handleAddToCart} 
          handleRemoveFromCart={handleRemoveFromCart}
        />
      </Drawer>
      
      
    </ThemeProvider>
  );
}

export default App;
