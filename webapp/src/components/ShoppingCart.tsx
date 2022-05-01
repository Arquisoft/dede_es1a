import { AppBar, Button, Grid, Typography } from "@mui/material";
import { Rock } from "../shared/shareddtypes";
import CartItem from "./CartItem";
import "../css/ShoppingCart.css";
import LoginPod from "./solid-pods/LoginPod";
import { useNavigate } from "react-router-dom";

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

  return (
    <>
      {props.cartContent.length !== 0 ? (
        <>
          <Grid sx={{ width: 500 }}>
            <AppBar color="secondary" position="static">
              <Typography variant="h5">Mi Carrito</Typography>
            </AppBar>
            <Typography variant="h5">
              Total (iva 21% incluido): {getTotalPrice().toFixed(2)} €
            </Typography>

            <Card  className="summary-cart">
                <div id="summary-labels">
                    <h3>Unidades: </h3>
                    <h2>Total: </h2>
                </div>
                <div id="summary-data">
                    <h3>{getTotalUds()}</h3>
                    <h2>{getTotalPrice().toFixed(2)} €</h2>
                </div>
            </Card>
                
            <Button
              disableElevation
              fullWidth
              color="secondary"
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
            {props.cartContent.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleAddToCart={props.handleAddToCart}
                handleRemoveFromCart={props.handleRemoveFromCart}
              />
            ))}
          </Grid>
        </>
      ) : (
        <Typography variant="h3">El carrito está vacío</Typography>
      )}
    </>
  );
}

export default Cart;
