import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//icons
import DraftsIcon from "@material-ui/icons/Drafts";
import IconButton from "@material-ui/core/IconButton";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Redirect } from "react-router-dom";
import firebase from 'firebase';

export default function TableListEnviados() {
  const listaEnviados = [];
  var lista = [];
  var user_email = "";
  const [listaEnv, setEnviados] = useState([]);
  const [novoDocumento, setNovoDocumento] = React.useState(false);
  const [abrirDocumento, setAbrirDocumento] = React.useState(false);
  const [Doc, setDoc] = useState([]);

  const handleNovoDocumento = () => {
    setNovoDocumento(true);
  };

  const handleAbrirDocumento = item => {
    setAbrirDocumento(true);
    setDoc(item);
  };

  let user = firebase.auth().currentUser;

  if (user != null) {
    user.providerData.forEach(function(profile) {
      user_email = profile.email.toString();
    });
  }

  firebase
    .database()
    .ref("enviados")
    .orderByChild("usuario_origem")
    .equalTo(user_email)
    .once("value", snapshot => {
      snapshot.forEach(childItem => {
        listaEnviados.push({
          key: childItem.key,
          titulo: childItem.val().titulo,
          descricao: childItem.val().descricao,
          data: childItem.val().data,
          destinatario: childItem.val().usuario_destino,
          remetente: childItem.val().usuario_origem,
          referencia: childItem.val().referencia,
          tipo_documento: childItem.val().tipo_documento
        });
      });
      return handleLista();
    });

  const handleLista = () => {
    listaEnviados.map(item => {
      lista = [...lista, [item.destinatario, item.titulo, item.data, renderDivBotoes(item)]];
    });

    setEnviados(lista);
  };

  function renderDivBotoes(item) {
    return (
      <div style={{ display: "table", float: "right" }}>
        <div style={{ display: "table-cell", paddingRight: "5px" }}>
          {renderButtonAbrirDocumento(item)}
        </div>
      </div>
    );
  }

  function renderButtonAbrirDocumento(item) {
    return (
      <IconButton color="warning" onClick={() => handleAbrirDocumento(item)}>
        <DraftsIcon />
      </IconButton>
    );
  }

  if (novoDocumento) {
    return <Redirect to="/admin/novodocumento" />;
  }

  if (abrirDocumento) {
    return (
      <Redirect
        to={{
          pathname: "/admin/abrirdocumento",
          state: { doc: Doc }
        }}
      />
    );
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="warning">
            <Button color="white" onClick={handleNovoDocumento}>
              Novo Envio
            </Button>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={["Para", "Descrição", "Data", ""]}
              tableData={listaEnv}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
