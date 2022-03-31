import { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import  {getRocas} from './api/api';

import { createTheme } from '@mui/material';
import './css/App.css';
import NavBar from './components/NavBar';
import { HashRouter, Route, Routes, Navigate, BrowserRouter as Router } from "react-router-dom";
import {Roca} from './shared/shareddtypes';
import Catalogo from './components/Catalogo';
import { ThemeProvider } from '@emotion/react';
import { theme } from './code/Theme';


//import {createData} from "./code/insertExampleData"

function App(): JSX.Element {
  const [rocas,setRocas] = useState<Roca[]>([]);

  const refreshRocaList = async () => {
    setRocas(await getRocas());
  }

  useEffect(()=>{
    refreshRocaList();
  },[]);


  /**
   *       <Routes>
              

              <Route
                path="/mountain"
                render={() => <Item searchTerm="mountain" />}
              />
              <Route path="/beach" render={() => <Item searchTerm="beach" />} />
              <Route path="/bird" render={() => <Item searchTerm="bird" />} />
              <Route path="/food" render={() => <Item searchTerm="food" />} />
              <Route
                path="/search/:searchInput"
                render={props => (
                  <Search searchTerm={props.match.params.searchInput} />
                )}
              />
              <Route component={NotFound} />
      </Routes>
   */
  return (
    <ThemeProvider theme={theme}>

      <NavBar/>
      <Router>
        <Routes>
          <Route path="/home" element={<Welcome message={'Hola xd'} />} />
          <Route path="/" element={<Navigate replace to="/home" />} />
          <Route path="/catalogo" element={<Catalogo rocas={rocas}/>}/>
        </Routes>
      </Router>
      
    </ThemeProvider>
  );
}


export default App;
