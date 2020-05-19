import React from "react";
import ButtonCustom from "components/CustomButtons/Button.js";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import firebase from "firebase";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

const Senha = () => {
  const [showMessage, setShowMessage] = React.useState(false);
  const classes = useStyles();
  const handleSubmit = event => {
    event.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(event.target.email.value)
      .then(() => {
        setShowMessage(true);
      });
  };

  if (showMessage) {
    return <Redirect from="/" to="/message/senha" />;
  }

  return (
    <div>
      <h6>
        Um email será enviado nos próximos 5 minutos com o link para atualizar
        sua senha.
      </h6>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="user"
          label="Email"
          name="email"
          autoComplete="user"
          autoFocus
          type="email"
        />

        <ButtonCustom
          type="submit"
          fullWidth
          variant="contained"
          color="warning"
          className={classes.submit}
        >
          Enviar
        </ButtonCustom>
      </form>
    </div>
  );
};

export default Senha;
