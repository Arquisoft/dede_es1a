import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Avatar, Tooltip } from '@mui/material';

type Props = {
    openCart: () => void;
  };

const NavBar:React.FC<Props>=({openCart}) =>{
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
                <Tooltip title="Open shopping cart">
                    <IconButton onClick={openCart} sx={{ p: 0 }}>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                </Tooltip>
            </Toolbar>     
        </AppBar>
            );
    }
export default NavBar;