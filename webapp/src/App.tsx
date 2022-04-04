import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import  {getRocas} from './api/api';
import './css/App.css';
import { Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import {Rock} from './shared/shareddtypes';
import Catalog from './components/Catalog';
import { ThemeProvider } from '@emotion/react';
import { theme } from "./code/Theme";
import NavBar from './components/NavigationBar';
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

      <NavBar/>
      <Router>
        <Routes>
          <Route path="/home" element={<Welcome/>} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/catalog" element={<Catalog rocks={rocks}/>}/>
        </Routes>
      </Router>
      
    </ThemeProvider>

  );
}

export default App;
