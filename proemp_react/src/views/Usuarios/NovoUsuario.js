import React from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TextField from "@material-ui/core/TextField";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import { makeStyles } from "@material-ui/core/styles";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

const NovoUsuario = () => {
  const classes = useStyles();
  const [voltar, setVoltar] = React.useState(false);

  const handleCancelar = () => {
    setVoltar(true);
  };

  const handleSubmit = event => {
    event.preventDefault();

    let firebaseRef = firebase.database().ref("usuarios");

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        document.getElementsByName("email")[0].value,
        "proemp"
      )
      .then(() => {
        firebaseRef.push({
          nome: document.getElementsByName("nome")[0].value,
          email: document.getElementsByName("email")[0].value,
          cpf: document.getElementsByName("cpf")[0].value,
          telefone: document.getElementsByName("telefone")[0].value,
          referencia: document.getElementsByName("referencia")[0].value
        });
        setVoltar(true);
      })
      .catch(() => {
        alert("Email inválido ou já cadastrado");
      });
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
              <h4 className={classes.cardTitleWhite}>Incluir Novo Usuário</h4>
              <p className={classes.cardCategoryWhite}> </p>
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
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={3}>
                    <TextField
                      required
                      id="telefone"
                      name="telefone"
                      fullWidth
                      label="Telefone"
                    />
                  </GridItem>
                  <GridItem xs={4} sm={4} md={2}>
                    <TextField
                      required
                      id="referencia"
                      name="referencia"
                      fullWidth
                      label="Referência"
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <br />
                <br />
                <Button type="submit" color="warning">
                  Incluir
                </Button>
                <Button type="button" onClick={handleCancelar} color="danger">
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

export default NovoUsuario;
