import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRocksById } from "../api/api";
import "../css/LoginRegister.css";
import { Button, Card, CardMedia, Grid, Paper, Typography } from "@mui/material";
import InfoIcon from '@mui/icons-material/Info';
import { Rock } from "../shared/shareddtypes";
import ProductViewData from "./ProductViewData";
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
          >
            <Grid item>
              <Typography variant="h2">{rock.name}</Typography>
            </Grid>
            <CardMedia component="img"
              height="500"
              width="600"
              image={rock.img}
              alt={rock.name}
            />
            <Grid item>
              <Grid container spacing={2} marginTop={2}>
                <Grid item xs={6}>
                <ProductViewData infoContent={"Hay 3 tipos de rocas dependiendo de su proveniencia: Sedimentarias, Ígneas y Metamórficas"} content={"Tipo"} />

                </Grid>
                <Grid item xs={6}>
                <ProductViewData  content={rock.type} />
                </Grid>
                <Grid item xs={6}>
                <ProductViewData infoContent={"La medida internacional es g/m³"} content={"Densidad"} />
                </Grid>
                <Grid item xs={6}>
                <ProductViewData  content={rock.density+" g/m³"} />
                </Grid>

                <Grid item xs={6}>
                <ProductViewData infoContent={"La escala de Mohs es una relación de diez minerales ordenados por su dureza, de menor a mayor. Tiene una relacion exponencial relativa a las unidades de dureza (10 Mohs ≈ 7000 kg/mm²)"} content={"Mohs"} />
                </Grid>
                <Grid item xs={6}>
                <ProductViewData content={rock.mohsHardness.toString()} />
                </Grid>

                <Grid item xs={6}>
                <ProductViewData content={"Precio"} />
                </Grid>
                <Grid item xs={6}>
                <ProductViewData content={rock.price+"€"}  />
                </Grid>
                <Button
                  sx={{ marginBottom: '4em' }}
                  variant="contained"
                  className='btnBuy'
                  color="primary"

                  style={{ width: '100%' }}
                  onClick={() => props.handleAddToCart(rock)}>
                  Comprar</Button>

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
