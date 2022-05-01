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
    console.log(rock)
  }
  useEffect(() => {
    refreshRock();
  }, []);
  if (rock !== undefined)
    return (
      <>
        <Grid container>
          <Grid item>
            <Typography>{rock.name}</Typography>
          </Grid>
        </Grid>
      </>
    );
  else
    return <></>
}

export default ProductView;
