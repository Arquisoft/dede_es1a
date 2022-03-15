import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./logginForm.css"
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import logo from '../../logoAsturShop.png'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import NavBar from "../components/navBar";
import {useNavigate} from 'react-router-dom';

type EmailFormProps = {
  OnUserListChange: () => void;
}

type NotificationType = {
  severity: AlertColor,
  message: string;
}

function prueba(): JSX.Element {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //let result:boolean = await checkUser(username,password);
    let result = true;
    if (result){
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You have been registered in the system!'
      });
      navigate("/inicio");
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
        <h3>Usuario:</h3>
    </>
  );
}

export default prueba;