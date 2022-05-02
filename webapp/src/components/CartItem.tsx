import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { Card, CardContent, CardMedia } from "@mui/material";
import { Rock } from "../shared/shareddtypes";

type CartItemProps = {
  item: Rock;
  handleAddToCart: (selectedItem: Rock) => void;
  handleRemoveFromCart: (id: string) => void;
};

function CartItem(props: CartItemProps): JSX.Element {
  return (
    <Card className="cartItem-ci">
      <CardMedia
        className="img-ci"
        component="img"
        sx={{ width: 150, maxWidth: 150 }}
        image={props.item.img}
        alt={props.item.name}
      />
      <CardContent>
        <Typography className="name-ci" variant="h5">
          {" "}
          {props.item.name}{" "}
        </Typography>
        <div className="quantityController-ci">
          <Button
            size="small"
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => props.handleRemoveFromCart(props.item.name)}
          >
            <Typography id="quantity-ci" variant="h6">
              -
            </Typography>
          </Button>
          <Typography id="quantity-ci" variant="h6">
            {props.item.quantityCart + " uds"}
          </Typography>
          <Button
            size="small"
            disableElevation
            variant="contained"
            color="primary"
            onClick={() => props.handleAddToCart(props.item)}
          >
            <Typography id="quantity-ci" variant="h6">
              +
            </Typography>
          </Button>
        </div>
        <Typography id="quantity-ci" variant="h6">
          {(props.item.price * props.item.quantityCart).toFixed(2) + " €"}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CartItem;
