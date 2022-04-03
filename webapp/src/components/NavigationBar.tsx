import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';


const pages = ['Catálogo', 'Iniciar Sesión', 'Registrarse'];
const settings = ['Perfil', 'Desconectar'];

const NavBar=() =>{
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
                <Button color="inherit" href = "/login">Iniciar Sesión</Button> 
                <Button color="inherit" href = "/register">Regístrate</Button> 
                
            </Toolbar>     
        </AppBar>
            );
    }
export default NavBar;