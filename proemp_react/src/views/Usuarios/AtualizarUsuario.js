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
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="warning">
              <h4>Incluir Referencia</h4>
              <p> </p>
            </CardHeader>
            <CardBody>
              <form
              // onSubmit={handleSubmit}
              >
                <GridContainer>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      autoFocus
                      required
                      id="nome"
                      name="nome"
                      fullWidth
                      label="Nome"
                      value={props.location.state.nome}
                    />
                  </GridItem>
                  <GridItem xs={6} sm={6} md={4}>
                    <TextField
                      autoFocus
                      required
                      id="email"
                      name="email"
                      fullWidth
                      label="Email"
                      type="email"
                      value={props.location.state.email}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={4} sm={4} md={3}>
                    <TextField
                      autoFocus
                      required
                      id="cpf"
                      name="cpf"
                      fullWidth
                      label="CPF"
                      value={props.location.state.cpf}
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={3}>
                    <TextField
                      autoFocus
                      required
                      id="telefone"
                      name="telefone"
                      fullWidth
                      label="Telefone"
                      value={props.location.state.telefone}
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={2}>
                    <TextField
                      autoFocus
                      required
                      id="referencia"
                      name="referencia"
                      fullWidth
                      label="Referência"
                      value={props.location.state.referencia}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <br />
                <br />
                <Button type="submit" color="warning">
                  Incluir
                </Button>
                <Button
                  type="button"
                  //  onClick={handleCancelar}
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
