
//import { useQuery } from 'react-query';
import Box from '@mui/material/Box';
//import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

import logo from './images/interfaz/logoRock.png';
import Title from './components/titleUtil';


import { createTheme, Drawer, List } from '@mui/material';
import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import  {getRocas} from './api/api';
import './css/App.css';
import { Route, Routes, Navigate, BrowserRouter as Router, BrowserRouter } from "react-router-dom";
import {Rock} from './shared/shareddtypes';
import Catalog from './components/Catalog';
import { ThemeProvider } from '@emotion/react';
import { theme } from "./code/Theme";
import LogIn from "./components/Login";
import Register from "./components/Register";
import NavBar from "./components/NavigationBar";
import { Container } from "@mui/material";
//import {createData} from "./code/insertExampleData"

//import {createData} from "./code/insertExampleData"
import "./css/App.css"
import ShoppingCart from "./components/ShoppingCart";
import PaymentPage from "./components/PaymentPage";
import { ContentCopy } from "@mui/icons-material";

type Props = {
  openCart: () => void;
};

function App(): JSX.Element {
  const [rocks, setRocks] = useState<Rock[]>([]);

  const refreshRockList = async () => {
    setRocks(await getRocas());
  };

  // Shopping cart
  const [isNewCart, setNewCart] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [cartContent, setCartContent] = useState<Rock[]>([]);

  useEffect(() => {
    if (isNewCart) {
      resetCart();
      setNewCart(false);
      return;
    }
    const memoryCart = localStorage.getItem("cart");
    if (memoryCart) {
      let cart: Rock[] = JSON.parse(memoryCart);
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

  const handleAddToCart = (selectedItem: Rock) => {
    localStorage.setItem("cart", JSON.stringify(cartContent));
    setCartContent((cart) => {
      if (cart.find((rocaInCart) => rocaInCart.name === selectedItem.name)) {
        // return cart.map(Rock => (
        //   Rock.name === selectedItem.name ?
        //     { ...Rock, quantityCart: Rock.quantityCart + 1 } :
        //     Rock
        // ));
        var tempCart = cart.map((Rock) =>
          Rock.name === selectedItem.name
            ? { ...Rock, quantityCart: Rock.quantityCart + 1 }
            : Rock
        );
        return tempCart;
      }
      // return [...cart, {...selectedItem, quantityCart: 1}];
      var tempCart = [...cart, { ...selectedItem, quantityCart: 1 }];
      return tempCart;
    });
  };

  const handleRemoveFromCart = (name: string) => {
    localStorage.setItem("cart", JSON.stringify(cartContent));
    setCartContent((cart) =>
      cart.reduce((sum, p) => {
        if (p.name === name) {
          if (p.quantityCart === 1) {
            return sum;
          }
          // return [...sum, {...p, quantityCart: p.quantityCart - 1}];
          var tempCart = [...sum, { ...p, quantityCart: p.quantityCart - 1 }];
          return tempCart;
        } else {
          // return [...sum, p];
          var tempCart = [...sum, p];
          return tempCart;
        }
      }, [] as Rock[])
    );
  };

  useEffect(() => {
    refreshRockList();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="principal">
        <NavBar openCart={() => setCartOpen(true)} />
        <BrowserRouter>
          <Routes>
            <Route
              path="/home"
              element={<Welcome handleAddToCart={handleAddToCart} />}
            />
            <Route path="/" element={<Navigate replace to="/home" />} />
            <Route
              path="/catalog"
              element={
                <Catalog rocks={rocks} handleAddToCart={handleAddToCart} />
              }
            />
            <Route
              path="/payment"
              element={
                <PaymentPage
                  cartContent={cartContent}
                  setNewCart={setNewCart}
                />
              }
            />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </BrowserRouter>
        <Drawer
          anchor="right"
          open={isCartOpen}
          onClose={() => setCartOpen(false)}
        >
          <ShoppingCart
            cartContent={cartContent}
            handleAddToCart={handleAddToCart}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        </Drawer>
      </Container>
    </ThemeProvider>
  );
}

export default App;
