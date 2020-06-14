import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

const AtualizarUsuario = ({ ...props }) => {
  const [user] = React.useState(props.location.state);
  const [voltar, setVoltar] = React.useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    console.log(event.target.email.value);
    let useProv = event.target.value;
    firebase
      .database()
      .ref("usuarios")
      .child(user.key)
      .set({
        nome: event.target.nome.value,
        email: event.target.email.value,
        cpf: event.target.cpf.value,
        referencia: event.target.referencia.value,
        telefone: event.target.telefone.value
      });
    setVoltar(true);
  };

  if (voltar) {
    return <Redirect to="/admin/listaUsuario" />;
  }

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="warning">
              <h4>Alterar Dados do Usuário</h4>
              <p> </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      autoFocus
                      required
                      id="nome"
                      name="nome"
                      fullWidth
                      label="Nome"
                      defaultValue={user.nome}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      fullWidth
                      label="Email"
                      type="email"
                      disabled
                      defaultValue={user.email}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={4} sm={4} md={3}>
                    <TextField
                      required
                      id="cpf"
                      name="cpf"
                      fullWidth
                      label="CPF"
                      defaultValue={user.cpf}
                      disabled
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={3}>
                    <TextField
                      required
                      id="telefone"
                      name="telefone"
                      fullWidth
                      label="Telefone"
                      defaultValue={user.telefone}
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={2}>
                    <TextField
                      required
                      id="referencia"
                      name="referencia"
                      fullWidth
                      label="Referência"
                      defaultValue={user.referencia}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <br />
                <br />
                <Button type="submit" color="warning">
                  Atualizar
                </Button>
                <Button
                  type="button"
                  onClick={() => setVoltar(true)}
                  color="danger"
                >
                  Cancelar
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

export default AtualizarUsuario;
