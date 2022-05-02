import { AppBar, Button, Card, Grid, List, Typography } from "@mui/material";
import { Rock } from "../shared/shareddtypes";
import CartItem from "./CartItem";
import "../css/ShoppingCart.css";

type CartProps = {
  cartContent: Rock[];
  handleAddToCart: (selectedItem: Rock) => void;
  handleRemoveFromCart: (id: string) => void;
};

function Cart(props: CartProps): JSX.Element {
  const getTotalPrice = () =>
    props.cartContent.reduce(
      (sum: number, item) => sum + item.quantityCart * item.price,
      0
    );
  const getTotalUds = () =>
    props.cartContent.reduce((sum: number, item) => sum + item.quantityCart, 0);
  return (
    <Card sx={{ width: "32em" }} className="cart" variant="outlined">
      <AppBar position="relative" className="title-cart">
        <h1>Mi carrito</h1>
      </AppBar>

      <List
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          height: "100%",
          "& ul": { padding: 0 },
        }}
        subheader={<li />}
      >
        {[0].map((sectionId) => (
          <li key={`section-${sectionId}`}>
            <ul>
              {props.cartContent.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  handleAddToCart={props.handleAddToCart}
                  handleRemoveFromCart={props.handleRemoveFromCart}
                />
              ))}
            </ul>
          </li>
        ))}
      </List>

      <Card sx={{padding:'5%'}}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h5">Unidades: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">{getTotalUds()}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">Total: </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5">{getTotalPrice().toFixed(2)} €</Typography>
          </Grid>
        </Grid>
      </Card>

      <Button
        size="medium"
        disableElevation
        variant="contained"
        disabled={props.cartContent.length <= 0}
        onClick={() => {
          if (sessionStorage.getItem("userLogged"))
            window.location.href = "/payment";
          else window.location.href = "/login";
        }}
      >
        Realizar Pedido
      </Button>
    </Card>
  );
}

export default Cart;
