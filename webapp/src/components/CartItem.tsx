import { Grid, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { Card, CardContent, CardMedia } from "@mui/material";
import { Rock } from "../shared/shareddtypes";

type CartItemProps = {
  item: Rock;
  handleAddToCart: (selectedItem: Rock) => void;
  handleRemoveFromCart: (id: string) => void;
};

function CartItem(props: CartItemProps): JSX.Element {
  return (
    <Card  sx={{ height: "25vh",paddingY:"2vh" }}>
      <CardMedia
        component="img"
        sx={{ height: "55%" }}
        image={props.item.img}
        alt={props.item.name}
      />
      <CardContent>
        <Typography variant="h5">{props.item.name}</Typography>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item>
                <Button
                color="secondary"
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => props.handleRemoveFromCart(props.item.name)}
                >
                  <Typography variant="h5">-</Typography>
                </Button>
              </Grid>
              <Grid item>
                <Typography variant="h5">
                  {props.item.quantityCart + " uds "}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                color="secondary"
                  size="small"
                  disableElevation
                  variant="contained"
                  onClick={() => props.handleAddToCart(props.item)}
                >
                  <Typography variant="h5">+</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="h4">
              {(props.item.price * props.item.quantityCart).toFixed(2) + " €"}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default CartItem;
