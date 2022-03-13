import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import RockImg from './components/rocksUtil';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {User} from './shared/shareddtypes';
import './App.css';
import rockWelcome from '../rocksWelcome.jpg';

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
        <Welcome message="Rock-Shop"/>
        <Box component="div" sx={{ py: 2}}>En Rock-Shop podrás encontrar gran variedad de rocas, desde las más comunes hasta las más exóticas.</Box>
        <RockImg/>
      </Container>
    </>
  );
}

export default App;
