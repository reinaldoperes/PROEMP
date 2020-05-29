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

export default function NovoDocumento() {
  const classes = useStyles();
  const [voltar, setVoltar] = React.useState(false);
  const listaRef = [];
  const [listaReferencias, setListaReferencias] = useState([]);
  const [keyRef, setKeyRef] = useState("");
  const listaTipoDoc = [];
  const listaUsers = [];
  const [listaTipo, setListaTipoDoc] = useState([]);
  const [keyTipoDoc, setKeyTipoDoc] = useState("");
  const [listaUsuarios, setListaUsuarios] = useState([]);
  var database = firebase.database();

  useEffect(() => {
    database.ref("referencia").once("value", snapshot => {
      snapshot.forEach(childItem => {
        listaRef.push({
          key: childItem.key,
          nome: childItem.val().nome
        });
      });
      setListaReferencias(listaRef);
    });

    database.ref("tipo_documento").once("value", snapshot => {
      snapshot.forEach(childItem => {
        listaTipoDoc.push({
          key: childItem.key,
          nome: childItem.val().nome
        });
      });
      setListaTipoDoc(listaTipoDoc);
    });

    database.ref("usuarios").once("value", snapshot => {
      snapshot.forEach(childItem => {
        listaUsers.push({
          key: childItem.key,
          email: childItem.val().email
        });
      });
      setListaUsuarios(listaUsers);
    });
  }, []);

  const handleCancelar = () => {
    setVoltar(true);
  };

  if (voltar) {
    return <Redirect to="/admin/entrada" />;
  }

  const handleChangeRef = event => {
    setKeyRef(event.target.value);
  };

  const handleChangeTipoDoc = event => {
    setKeyTipoDoc(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();

    //Pegando email do usuario logado
    let user = firebase.auth().currentUser;
    let user_email = "";
    if (user != null) {
      user.providerData.forEach(function(profile) {
        user_email = profile.email.toString();
      });
    }

    let now = new Date();

    let data =
      now.getDate() +
      "/" +
      now
        .getMonth()
        .toString()
        .padStart(2, "0") +
      "/" +
      now.getFullYear();
    let titulo = document.getElementsByName("titulo")[0].value;
    let descricao = document.getElementsByName("descricao")[0].value;
    let usu_destino = document.getElementsByName("email")[0].value;
    let referencia = document.getElementsByName("referencia")[0].value;
    let tipo_documento = document.getElementsByName("tipodocumento")[0].value;
    let usu_origem = user_email;

    let enviados = firebase.database().ref("enviados");
    let chave = enviados.push().key;
    enviados.child(chave).set({
      data: data,
      descricao: descricao,
      referencia: referencia,
      tipo_documento: tipo_documento,
      titulo: titulo,
      usuario_destino: usu_destino,
      usuario_origem: usu_origem
    });

    let caixaentrada = firebase.database().ref("caixaentrada");
    chave = caixaentrada.push().key;
    caixaentrada.child(chave).set({
      data: data,
      descricao: descricao,
      referencia: referencia,
      tipo_documento: tipo_documento,
      titulo: titulo,
      usuario_destino: usu_destino,
      usuario_origem: usu_origem
    });

    setVoltar(true);
  };

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>
                Novo Envio de Documento
              </h4>
              <p className={classes.cardCategoryWhite}> </p>
            </CardHeader>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <p>Referência:</p>
                    <select
                      style={{ width: "100%", height: "50px" }}
                      name="referencia"
                      value={keyRef}
                      onChange={e => handleChangeRef(e)}
                    >
                      {listaReferencias.map(ref => {
                        return (
                          <option key={ref.key} value={ref.key}>
                            {ref.nome}
                          </option>
                        );
                      })}
                    </select>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={5}>
                    <p>Tipo de Documento:</p>
                    <select
                      style={{ width: "100%", height: "50px" }}
                      name="tipodocumento"
                      value={keyTipoDoc}
                      onChange={e => handleChangeTipoDoc(e)}
                    >
                      {listaTipo.map(ref => {
                        return (
                          <option key={ref.key} value={ref.key}>
                            {ref.nome}
                          </option>
                        );
                      })}
                    </select>
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <Autocomplete
                      id="combobox"
                      options={listaUsuarios}
                      getOptionLabel={user => user.email}
                      style={{ width: "100%" }}
                      renderInput={params => (
                        <TextField
                          {...params}
                          autoFocus
                          name="email"
                          label="Para:"
                          variant="outlined"
                        />
                      )}
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
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <GridContainer>
                  <GridItem xs={12} sm={12} md={10}>
                    <textarea
                      id="descricao"
                      name="descricao"
                      placeholder="Descrição"
                      required
                      maxLength="100"
                      style={{ width: "100%", height: "100px" }}
                    />
                  </GridItem>
                </GridContainer>
                <br />
                <br />
                <Button type="submit" color="warning">
                  Enviar
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
}
