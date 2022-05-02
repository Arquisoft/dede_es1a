import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import logo from '../../logoAsturShop.png'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { checkUser } from '../api/api';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Grid, Link, Typography } from '@mui/material';

const checkParams = (text: String) => {
  return text.trim() === "" || text == null;
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
  const [notification, setNotification] = useState<NotificationType>({ severity: 'success', message: '' });

  const navigate = useNavigate();


  const handleLogin = (email: String, pass: String) => {
    axios.post(("http://localhost:5000/api/user/login"|| process.env.REACT_APP_API_URI +"/users/login"),{"email":email,"password":pass})
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
    let result: boolean = await checkUser(email, password);
    if (result) {
      setNotificationStatus(true);
      setNotification({
        severity: 'success',
        message: 'You have been registered in the system!'
      });
      console.log(sessionStorage.getItem("userLogged"));
      navigate("/catalog");
      window.location.reload();
    }
    else {
      setNotificationStatus(true);
      setNotification({ 
        severity:'error',
        message:'El usuario o contraseña son incorrectos, vuelva a introducirlos'
      });
    }
  }
  function allFunc(idUser: String, pass: String) {
    handleLogin(idUser, pass);
    setPulse(true);
  }


  return (
    <>
      <form name="loggin" onSubmit={handleSubmit}>
        <Grid
          container
          style={{ width: '100%' }}
          direction="column"
          alignItems="center"
          padding={2}
        >
          <Grid item >
            <Typography variant="h2">Iniciar sesión</Typography>
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id="email"
              name="Usuario"
              label="email"
              variant="outlined"
              fullWidth
              value={email}
              error={checkParams(email) && pulse}
              helperText={checkParams(email) && pulse ? 'El campo no puede estar vacio' : ''}
              onChange={e => setEmail(e.target.value)}
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id="password"
              name="Contraseña"
              label="password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              error={checkParams(password) && pulse}
              helperText={checkParams(password) && pulse ? 'El campo no puede estar vacio' : ''}
              onChange={e => setPassword(e.target.value)}
              sx={{ my: 2 }}
            />

          </Grid>
          <Grid item width={'50%'}>

            <Button onClick={() => allFunc(email, password)} variant="contained" fullWidth type="submit">Iniciar Sesión</Button>

          </Grid>
          <Grid item marginTop={2}>
            <Link href="/register">
              <Typography >¿Aún no estás registrado? Regístrate aqui!</Typography>
            </Link>
          </Grid>
        </Grid>
        <Snackbar open={notificationStatus} autoHideDuration={3000} onClose={() => { setNotificationStatus(false) }}>
          <Alert severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>
      </form>
    </>
  );
}

export default EmailForm;