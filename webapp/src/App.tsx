import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import EmailForm from './components/EmailForm';
import Welcome from './components/Welcome';
import UserList from './components/UserList';
import  {getUsers} from './api/api';
import {Roca, User} from './shared/shareddtypes';
import './App.css';
import Catalogo from './components/Catalogo';
import { debug } from 'console';
import { debuglog } from 'util';

function createData():Roca[]{
  
  
  const rocas=[];
  const numDatos=100;
  const rugosidad=["lisa","rugosa", "pulida"]
  const tipo=["igneas","metamorficas", "sedimentarias"]
  for (let i = 0; i < numDatos; i++) {
    var rock: Roca={
      id: i,
      name: "roca n "+i,
      img: "https://www.amazon.es/clouddrive/folder/wNswVOqSROmGTyY4eElu1Q/2kc6XNUwT-St2ffSBPMuGw?sort=sortKind&sortOrder=desc",
      precio: (i^3)%20+10,
      durezaMohs: (i*9999)%7000,
      rugosidad: rugosidad[i%3],
      Tipo: tipo[i%3]
    }
    rocas.unshift(rock)
  }
  return rocas
}

function App(): JSX.Element {

  const [users,setUsers] = useState<User[]>([]);
  const [rocas,setRocas] = useState<Roca[]>(createData());

  
  const refreshUserList = async () => {
    setUsers(await getUsers());
  }

  useEffect(()=>{
    refreshUserList();
  },[]);

  return (
    <>
      <Container maxWidth="sm">
      <Welcome message="ASW students"/>
        <Catalogo rocas={rocas}/>
        <Link href="https://github.com/pglez82/asw2122_0">Source code</Link>
      </Container>
    </>
  );
}

export default App;
