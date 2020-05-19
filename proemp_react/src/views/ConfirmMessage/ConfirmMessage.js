import React from "react";
import ButtonCustom from "components/CustomButtons/Button.js";
import { Redirect } from "react-router-dom";

const ConfirmMessage = ({ ...props }) => {
  const [showLogin, setShowlogin] = React.useState(false);
  const [msg, setMsg] = React.useState(false);
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
      <form onSubmit={handleSubmit}>
        <ButtonCustom
          type="submit"
          fullWidth
          variant="contained"
          color="warning"
        >
          Voltar
        </ButtonCustom>
      </form>
    </div>
  );
};

export default ConfirmMessage;
