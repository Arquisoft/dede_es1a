import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type { AlertColor } from "@mui/material/Alert";
import { useNavigate, useParams } from "react-router-dom";
import Link from "@mui/material/Link";
import { addUser, getRocksById } from "../api/api";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/LoginRegister.css";
import { Grid, Typography } from "@mui/material";
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
        <Grid container
          style={{ width: '100%' }}
          direction="column"
          alignItems="center"
          padding={2}>
          <Grid item>
            <Typography variant="h2">{rock.name}</Typography>
          </Grid>
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
      </>
    );
  else
    return <></>
}

export default ProductView;
