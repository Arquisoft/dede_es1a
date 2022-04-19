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
import Swal from 'sweetalert2';
import axios from 'axios';
import { Link } from '@mui/material';

const checkParams = (text: String) => {
  return text === "" || text == null;
}

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
  const [pulse, setPulse] = useState(false)

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  const navigate = useNavigate();


  const handleLogin = (email: String, pass: String) => {
    axios.post("http://localhost:5000/user/login",{"email":email,"password":pass})
    .then(res => {
        if(res.status == 201){
         Swal.fire({
             title: "Sesión iniciada",
             icon: "success"
         }).then(() => {
             console.log(res.data)
             localStorage.setItem('token',res.data.token);
             window.location.assign("/products");
         });
        }else{
             Swal.fire({
                 title: "Creedenciales incorrectos",
                 text: "El usuario o contraseña son incorrectos, vuelva a introducirlos",
                 icon: "error",
                 footer: '<a href ="/signup">¿No tienes cuenta? Registrate ahora!</a>'
             });
        }
    })
 }
 
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result:boolean = await checkUser(email,password);
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You have been registered in the system!'
      });
      navigate("/home");
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
  function allFunc(idUser: String, pass: String){
    handleLogin(idUser, pass);
    setPulse(true);
}


  return (
    <>
      <div className='loginBackground'>
      <form name="loggin" onSubmit={handleSubmit}>

      <div className='registerForm'>
      <h1>Entrar en Sesión</h1>
      <div className='field-container'>
      
        <TextField
            required
            name="Usuario"
            label="email" 
            variant="outlined"
            value={email}
            error = {checkParams(email) && pulse}
            helperText={checkParams(email) && pulse ? 'El campo no puede estar vacio' : ''}
            onChange={e => setEmail(e.target.value)}
            sx={{ my: 2 }}
          />
      </div>
      <div className='field-container'>
   
        <TextField
          required
          name="Contraseña"
          label="password" 
          variant="outlined"
          type="password"
          value={password}
          error = {checkParams(password) && pulse}
          helperText={checkParams(password) && pulse ? 'El campo no puede estar vacio' : ''}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 2 }}
        />
        </div>    

        <div className='buttonCls'>
           <Button onClick={() => allFunc(email, password)} variant="contained" type="submit">Iniciar Sesión</Button>
           </div>
           <Link href = "/register">¿Aún no estás registrado? Regístrate aqui!</Link>
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