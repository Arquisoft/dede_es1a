import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';
import Box from '@mui/material/Box';
import {useNavigate} from 'react-router-dom';

type RegisterProps = {
  OnUserListChange: () => void;
}

type NotificationType = {
  severity: AlertColor,
  message: string;
}


function RegisterForm(): JSX.Element {

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const[dni,setDni] = useState('');
  const[name,setName] = useState('');


  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({severity:'success',message:''});
  
  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   // let result:boolean = await addUser({email,password,confirmPassword});
   let result = true;
    console.log({email});
    console.log({name});
    console.log({dni});
    console.log({password});
    console.log({confirmPassword})
 

    if (result){
      console.log("User Registered Succesfully");
      setNotificationStatus(true);
      setNotification({ 
        severity:'success',
        message:'You have been registered in the system!'
      });
      //Notify the change to the parent component
      navigate("/loggin");
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
     <h1>Registrarse</h1>

        <div id= "log" className="registro-container">
        <form onSubmit={handleSubmit} name="registro" >
        <div className="registro-contenido">

       <div className='field-container'>

          <TextField
          required
          label="Email:"
          name="email"
          id="filled-size-small"
          variant="filled"
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ my: 2 }}

        />
        </div>

        <div className='field-container'>
        <TextField
          required
          label="Name:"
          name="name"
          id="filled-size-small"
          variant="filled"
          value={name}
          onChange={e => setName(e.target.value)}
          sx={{ my: 2 }}

        />
        </div>

        <div className='field-container'>
        <TextField
          required
          label="DNI:"
          name="dni"
          id="filled-size-small"
          variant="filled"
          value={dni}
          onChange={e => setDni(e.target.value)}
          sx={{ my: 2 }}

        />
        </div>

        <div className='field-container'>

        <TextField
          required
          label="Password:"    
          name="password"
          id="filled-size-small"
          variant="filled"
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ my: 2 }}

        />
        </div>
        <div className='field-container'>

        <TextField
          required
          label="Confirm Password:"
          name="confirmPassword"
          id="filled-size-small"
          variant="filled"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          sx={{ my: 2 }}

        />

        </div>

        </div>
        <Button variant="contained" type="submit"  sx={{ my: 2 } }>Registrarse</Button>
        </form>
        </div>

    </>
  );
}

 export default RegisterForm;