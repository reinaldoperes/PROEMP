import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Redirect } from "react-router-dom";
import firebase from "firebase";

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

export default function AbrirDocumento(props) {
  const classes = useStyles();
  const [voltar, setVoltar] = React.useState(false);
  const [referencia, setReferencia] = useState("");
  const [tipodocumento, setTipoDocumento] = useState("");
  var database = firebase.database();

  useEffect(() => {
    database
        .ref("referencia")
        .orderByKey()
        .equalTo(props.location.state.doc.referencia)
        .once("value", snapshot => {
            snapshot.forEach(childItem => {
                setReferencia(childItem.val().nome);
        });        
    });

    database
        .ref("tipo_documento")
        .orderByKey()
        .equalTo(props.location.state.doc.tipo_documento)
        .once("value", snapshot => {
            snapshot.forEach(childItem => {
                setTipoDocumento(childItem.val().nome);
        });        
    });
  }, []);

  const handleCancelar = () => {
    setVoltar(true);
  };

  if (voltar) {
    return <Redirect to="/admin/entrada" />;
  }

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Documento
              </h4>
              <p className={classes.cardCategoryWhite}> {props.location.state.doc.remetente}</p>
            </CardHeader>
            <CardBody>
              <form>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <p>Referência:</p>
                    <select
                      style={{ width: "100%", height: "50px" }}
                      name="referencia"
                      value={referencia}
                      disabled
                    >
                        <option key={referencia} value={referencia}>
                        {referencia}
                        </option>
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <p>Tipo de Documento:</p>
                    <select
                      style={{ width: "100%", height: "50px" }}
                      name="tipodocumento"
                      value={tipodocumento}
                      disabled
                    >
                        <option key={tipodocumento} value={tipodocumento}>
                        {tipodocumento}
                        </option>
                    </select>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                  <TextField
                      required
                      id="email"
                      name="email"
                      fullWidth
                      label="Remetente"
                      value={props.location.state.doc.remetente}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <TextField
                      required
                      id="titulo"
                      name="titulo"
                      fullWidth
                      label="Assunto"
                      value={props.location.state.doc.titulo}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <p>Descrição:</p>
                    <textarea
                      id="descricao"
                      name="descricao"
                      placeholder="Descrição"
                      required
                      maxLength="100"
                      style={{ width: "100%", height: "100px" }}
                      value={props.location.state.doc.descricao}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <br />
                <Button type="button" onClick={handleCancelar} color="warning">
                  Voltar
                </Button>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
