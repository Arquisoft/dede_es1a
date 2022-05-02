import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { logout } from '../api/api';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

type Props = {
    openCart: () => void;
  };

const NavBar:React.FC<Props>=({openCart}) =>{

    const[isLoggedIn, setLoggedIn] = useState(false);

    function checkIsLoggedIn(){

        if (sessionStorage.getItem("userLogged")){
            setLoggedIn(true);
        }else{
            setLoggedIn(false);
        }
    }

    async function logOutUser(){
        sessionStorage.clear();
        let restult = await logout();
    };
    const i = sessionStorage.getItem("userLogged");
    useEffect(() =>{
       checkIsLoggedIn();
    },[isLoggedIn]);

    
    return(
        
        <AppBar position="fixed" >
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
               Rock-Shop
              </Typography>
              <Button color="inherit" href = "/">Home</Button>
              <Button color="inherit" href = "/catalog">Catálogo</Button>
    
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              </Typography>

              <IconButton onClick={() => window.location.href = '/summary'} aria-label="cart" size="medium">
                </IconButton>
                {isLoggedIn ? (
                    [<Typography variant="body1" component="div" sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
                    {sessionStorage.getItem("userLogged")}</Typography>,
                    <Button color="inherit" href = "/orders">Perfil</Button>
                    ,<Button color="inherit" onClick={() => logOutUser()} href = "/logout">Desconectarse</Button>]
                ):(
                    [<Button color="inherit" href = "/login">Iniciar Sesión</Button>,
                    <Button color="inherit" href = "/register">Regístrate</Button> ]
                )}
                <Tooltip title="Open shopping cart">
                    <IconButton onClick={openCart} sx={{ p: 0 }}>
                        <AddShoppingCartIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>     
        </AppBar>
            );
    }
export default NavBar;