import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRocksById } from "../api/api";
import "../css/LoginRegister.css";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { Rock } from "../shared/shareddtypes";
type RegisterProps = {
  handleAddToCart(r: Rock): void;
};

function ProductView(props: RegisterProps): JSX.Element {
  const { id } = useParams()
  const [rock, setRock] = useState<Rock>()
  const refreshRock = async () => {
    if (id !== undefined)
      setRock((await getRocksById(id))[0])
  }
  useEffect(() => {
    refreshRock();
  }, []);
  if (rock !== undefined)
    return (
      <>
      <Card>

    
        <Grid container
          style={{ width: '100%' }}
          direction="column"
          alignItems="center"
          padding={2}>
          <Grid item>
            <Typography variant="h2">{rock.name}</Typography>
          </Grid>
          <CardMedia component="img"
          height="500"
          image={rock.img}
          alt={rock.name}
        />
          <Grid item>
            <Grid container spacing={2} >
              <Grid item xs={6} >
                <Typography textAlign={'center'}>Tipo</Typography>
              </Grid>
              <Grid item xs={6} >
                <Typography textAlign={'center'}>{rock.type}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography textAlign={'center'}>Densidad</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign={'center'}>{rock.density} g/cm3</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography textAlign={'center'}>Mohs</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign={'center'}>{rock.mohsHardness}</Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography textAlign={'center'}>Precio</Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography textAlign={'center'}>{rock.price}€</Typography>
              </Grid>
            </Grid>
          </Grid>

        </Grid>
        </Card>
      </>
    );
  else
    return <></>
}

export default ProductView;
