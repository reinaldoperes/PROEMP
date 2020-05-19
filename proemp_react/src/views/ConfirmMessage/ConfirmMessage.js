import React from "react";
import ButtonCustom from "components/CustomButtons/Button.js";
import { makeStyles } from "@material-ui/core/styles";
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

const ConfirmMessage = ({ ...props }) => {
  const [showLogin, setShowlogin] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
  const classes = useStyles();
  const handleSubmit = () => {
    setShowlogin(true);
  };
  React.useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (props.match.params.type === "senha") {
      setMsg(
        "Verifique a caixa de entrada do seu email para atualizar sua senha"
      );
      // eslint-disable-next-line react/prop-types
    } else if (props.match.params.type === "usuario") {
      setMsg("msg do user");
    }
  }, []);

  if (showLogin) {
    return <Redirect from="/" to="/login" />;
  }

  return (
    <div>
      <h6>{msg}</h6>
      <form className={classes.form} onSubmit={handleSubmit}>
        <ButtonCustom
          type="submit"
          fullWidth
          variant="contained"
          color="warning"
          className={classes.submit}
        >
          Voltar
        </ButtonCustom>
      </form>
    </div>
  );
};

export default ConfirmMessage;
