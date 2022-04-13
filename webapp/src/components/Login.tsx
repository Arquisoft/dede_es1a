import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import logo from '../../logoAsturShop.png'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { checkUser } from '../api/api';

type EmailFormProps = {
  OnUserListChange: () => void;
}

type NotificationType = {
  severity: AlertColor,
  message: string;
}

function EmailForm(): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result:boolean = await checkUser(email,password);
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You have been registered in the system!'
      });
      console.log(sessionStorage.getItem("userLogged"));
      navigate("/catalog");
      //Notify the change to the parent component
    }
    else{
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'There\'s been an error in the register proccess.'
      });
    }
  }

  return (
    <>
      <br></br><br></br>
      <div className='loggin-container'>
      <form name="loggin" onSubmit={handleSubmit}>

      <div className='loggin-content'>
      <h3>Email:</h3>
      <div className='field-container'>
      
        <TextField
            required
            name="Usuario"
            label="email" 
            variant="outlined"
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ my: 2 }}
          />
      </div>
      <div className='field-container'>
   
        <h3>Contraseña:</h3>
        <TextField
          required
          name="Contraseña"
          label="password" 
          variant="outlined"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 2 }}
        />
        </div>    

        <div className='buttons'>
           <br></br>
           <Button variant="contained" onClick={() => handleSubmit} type="submit" sx={{ my: 2 }}>Iniciar sesión</Button>
           <br></br>
           <Button variant="contained" onClick={() => navigate("/register")} type="submit" sx={{ my: 2 }}>¿No tienes cuenta? Regístrate</Button>
           </div>
        </div>
        
        </form>
        
      </div>
      <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={()=>{setNotificationStatus(false)}}>
        <Alert severity={notification.severity} sx={{ width: '100%' }}>
          {notification.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default EmailForm;