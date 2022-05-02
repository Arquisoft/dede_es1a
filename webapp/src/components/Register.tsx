import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import type { AlertColor } from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import Link from "@mui/material/Link";
import { addUser } from "../api/api";
import Swal from "sweetalert2";
import axios from "axios";
import "../css/LoginRegister.css";
import { Grid, Typography } from "@mui/material";

type RegisterProps = {
  OnUserListChange: () => void;
};

type NotificationType = {
  severity: AlertColor;
  message: string;
};

const checkParams = (text: String) => {
  return text.trim() === "" || text == null;
};

const checkPaswwords = (repPass: String, pass: String) => {
  return repPass !== pass;
};

function RegisterForm(): JSX.Element {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [dni, setDni] = useState("");
  const [name, setName] = useState("");
  const [pulse, setPulse] = useState(false);

  async function allFunc(
    name: String,
    dni: String,
    email: String,
    password: String,
    confirmPassword: String
  ) {
    setPulse(true);
    if (
      await getEmail(email).then((resolve) => {
        return resolve;
      })
    ) {
      Swal.fire({
        title: "El e-mail ya existe",
        text: "El e-mail ya existe en el sistema, pruebe con otro",
        icon: "error",
      });
    } else {
      handleSignup(name, dni, email, password, confirmPassword);
    }
  }
  const handleSignup = (
    name: String,
    dni: String,
    email: String,
    pass: String,
    repPass: String
  ) => {
    axios
      .post("http://localhost:5000/user/signup", {
        name: name,
        dni: dni,
        email: email,
        role: "ROLE_USER",
        password: pass,
        repPassword: repPass,
      })
      .then((res: { data: any; status: number }) => {
        console.log(res);
        console.log(res.data);
        if (res.status == 201) {
          Swal.fire({
            title: "Usuario registrado",
            text: "Te has registrado correctamente en la aplicación",
            icon: "success",
          }).then(() => {
            window.location.assign("/login");
          });
        }
      });
  };
  const getEmail = async (email: String) => {
    const data = await axios
      .get("http://localhost:5000/user/list/" + email)
      .then((res) => {
        return res.data;
      });
    return data != null;
  };

  const [notificationStatus, setNotificationStatus] = useState(false);
  const [notification, setNotification] = useState<NotificationType>({
    severity: "success",
    message: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let result: boolean = await addUser({
      name: name,
      email: email,
      dni: dni,
      password: password,
      repeatPassword: confirmPassword,
    });
    console.log({ email });
    console.log({ name });
    console.log({ dni });
    console.log({ password });
    console.log({ confirmPassword });

    if (result) {
      console.log("User Registered Succesfully");
      setNotificationStatus(true);
      setNotification({
        severity: "success",
        message: "You have been registered in the system!",
      });
      //Notify the change to the parent component
      navigate("/login");
    } else {
      setNotificationStatus(true);
      setNotification({
        severity: "error",
        message: "There's been an error in the register proccess.",
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit} name="registro">
        <Grid
          container
          style={{width:'100%'}}
          direction="column"
          alignItems="center"
          padding={2}
          
        >
          <Grid item >
            <Typography variant="h2">Crear cuenta</Typography>
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id = "email"
              label="Email:"
              name="email"
              variant="filled"
              value={email}
              fullWidth
              error={checkParams(email) && pulse}
              helperText={
                checkParams(email) && pulse
                  ? "El campo no puede estar vacio"
                  : ""
              }
              onChange={(e) => setEmail(e.target.value)}
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id = "name"
              label="Name:"
              name="name"
              variant="filled"
              fullWidth
              value={name}
              error={checkParams(name) && pulse}
              helperText={
                checkParams(name) && pulse
                  ? "El campo no puede estar vacio"
                  : ""
              }
              onChange={(e) => setName(e.target.value)}
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id = "dni"
              label="DNI:"
              name="dni"
              variant="filled"
              fullWidth
              value={dni}
              error={checkParams(dni) && pulse}
              helperText={
                checkParams(dni) && pulse ? "El campo no puede estar vacio" : ""
              }
              onChange={(e) => setDni(e.target.value)}
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id="password"
              label="Password:"
              name="password"
              variant="filled"
              type="password"
              fullWidth
              value={password}
              error={checkParams(password) && pulse}
              helperText={
                checkParams(password) && pulse
                  ? "El campo no puede estar vacio"
                  : ""
              }
              onChange={(e) => setPassword(e.target.value)}
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item width={'50%'}>
            <TextField
              required
              id="confirmPassword"
              label="Confirm Password:"
              name="confirmPassword"
              variant="filled"
              type="password"
              value={confirmPassword}
              fullWidth
              error={checkParams(confirmPassword) && pulse}
              helperText={
                checkParams(confirmPassword) && pulse
                  ? "El campo no puede estar vacio"
                  : "" || (checkPaswwords(confirmPassword, password) && pulse)
                  ? "Las contraseñas no coinciden"
                  : ""
              }
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ my: 2 }}
            />
          </Grid>
          <Grid item width={'30%'}>
            <Button
              fullWidth
              onClick={() =>
                allFunc(name, dni, email, password, confirmPassword)
              }
              variant="contained"
              type="submit"
            >
              Regístrate
            </Button>
          </Grid>
          <Grid item  marginTop={2}>
            <Link href="/login">
              <Typography >¿Ya tienes una cuenta? Inicia sesión aqui!</Typography>
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

export default RegisterForm;
