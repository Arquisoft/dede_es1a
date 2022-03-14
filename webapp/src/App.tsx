import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import RockImg from './components/rocksUtil';
import logo from './logoRock.png';
import Title from './components/titleUtil';
import bgImg from '../rocksWelcome.jpg';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import { Button } from '@mui/material';
import './App.css';




function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);

  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>
      <Container maxWidth="sm">
        <style>{"body {  background-color: #8a6f24 }"}</style>
        <Title/>
        <Grid item xs={12} >
          <Box className="logoClass"><img src={logo} className="App-logo" alt="logo" /></Box>
        </Grid>
        <Grid item xs={12} className="formatButtons">
          <button type="button" className="buttonClass">Iniciar Sesion</button>
          <button type="button" className="buttonClass">Regístrate</button>
      </Grid>
      </Container>
    </>
  );
}

export default App;
