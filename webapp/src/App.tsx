import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import  {getRocas} from './api/api';
import './css/App.css';
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import {Rock} from './shared/shareddtypes';
import Catalog from './components/Catalog';
import { ThemeProvider } from '@emotion/react';
import { theme } from "./code/Theme";
import LogIn from './views/Login';
import Register from './views/Register';
import NavBar from './components/NavigationBar';
import { Container } from '@mui/material';
//import {createData} from "./code/insertExampleData"


//import {createData} from "./code/insertExampleData"

function App(): JSX.Element {
  const [rocks,setRocks] = useState<Rock[]>([]);

  const refreshRockList = async () => {
    setRocks(await getRocas());
  }

  useEffect(()=>{
    refreshRockList();
  },[]);
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" className="principal">
      <NavBar/>
      <Router>
        
        <Routes>
          <Route path="/home" element={<Welcome/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/catalog" element={<Catalog rocks={rocks}/>}/>
          <Route path = '/login' element = {<LogIn/>}/>
          <Route path = '/register' element = {<Register/>}/>
        </Routes>
        
      </Router>
      </Container>
    </ThemeProvider>

  );
}

export default App;
