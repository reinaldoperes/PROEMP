import React, { useState } from "react";
import ButtonCustom from "components/CustomButtons/Button.js";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import logo from "assets/img/proemp_logo.png";
import bgImage from "assets/img/proemp_fundo_login.png";
import { Redirect } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import firebase from "firebase";

const Copyright = () => {
  return (
    <Typography variant="body2" color="error" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        PROEMP
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    background: `url(${bgImage})`,
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Login = () => {
  const classes = useStyles();
  const [redireciona, setRedirect] = useState(false);
  const [recuperarSenha, setRecuperarSenha] = useState(false);

  const { updateUser, setUser } = useUser();

  React.useEffect(() => {
    setUser(localStorage.getItem("user"));
    if (localStorage.getItem("user")) setRedirect(true);
  }, []);

  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(
        event.target.user.value,
        event.target.senha.value
      )
      .then(fireUser => {
        updateUser(fireUser.user);
        setRedirect(true);
      })
      .catch(() => {
        alert("Usuário ou senha inválidos");
      });
  };

  if (redireciona) {
    return <Redirect from="/" to="/admin/entrada" />;
  }

  if (recuperarSenha) {
    return <Redirect from="/" to="/recuperarSenha" />;
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <img src={logo} style={{ width: "50%" }} />

          <form className={classes.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="user"
              label="Email"
              name="usuario"
              autoComplete="user"
              autoFocus
              type="email"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="senha"
              label="Senha"
              type="password"
              id="senha"
              autoComplete="current-password"
            />

            <Grid container>
              <Grid item xs>
                <Link
                  onClick={() => setRecuperarSenha(true)}
                  color="error"
                  href="#"
                  variant="body2"
                >
                  Esqueci minha senha
                </Link>
              </Grid>
              <Grid item>
                <Link color="error" href="#" variant="body2">
                  Esqueci meu email
                </Link>
              </Grid>
            </Grid>
            <ButtonCustom
              type="submit"
              fullWidth
              variant="contained"
              color="warning"
              className={classes.submit}
            >
              Entrar
            </ButtonCustom>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
