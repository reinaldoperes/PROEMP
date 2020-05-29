import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableListEnviados() {
  const classes = useStyles();
  const listaEnviados = [];
  var lista = [];
  var user_email = "";
  const [listaEnv, setEnviados] = useState([]);
  const [novoDocumento, setNovoDocumento] = React.useState(false);

  const handleNovoDocumento = () => {
    setNovoDocumento(true);
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
          destinatario: childItem.val().usuario_destino
        });
      });
      return handleLista();
    });

  const handleLista = () => {
    listaEnviados.map(item => {
      lista = [...lista, [item.destinatario, item.titulo, item.data]];
    });

    setEnviados(lista);
  };

  if (novoDocumento) {
    return <Redirect to="/admin/novodocumento" />;
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
              tableHead={["Para", "Descrição", "Data"]}
              tableData={listaEnv}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
