import React from 'react';
import ReactDOM from 'react-dom';
import {Roca} from './shared/shareddtypes';
import App from './App';
import Catalogo from './components/Catalogo';
import reportWebVitals from './reportWebVitals';
import { RocketSharp } from '@mui/icons-material';






ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
