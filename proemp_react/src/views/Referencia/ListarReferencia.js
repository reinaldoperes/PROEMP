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

export default function ListarReferencia() {
  const classes = useStyles();
  const listaRef = []
  var lista = []
  const [listaReferencias, setListaReferencias] = useState([]);
  const [novaRef, setNovaRef] = React.useState(false);

  const handleNovo = () => {
    setNovaRef(true);
  }  

  if(novaRef){
    return <Redirect to="/admin/incluirreferencia" />;
  }
  
  firebase.database().ref('referencia').once('value', (snapshot) => {
    snapshot.forEach((childItem) => {
      listaRef.push({
        key: childItem.key,
        nome: childItem.val().nome,
        descricao: childItem.val().descricao
      })
    });
    return handleLista();
  });

  const  handleLista = () => {
    listaRef.map(item =>{
      lista = [...lista ,[item.nome, item.descricao]]
    });
  
    setListaReferencias(lista);
    }
     
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="warning">
            <Button 
            color="white"
            onClick={handleNovo}>
              Novo
            </Button>
          </CardHeader>
          <CardBody>
          <Table
              tableHeaderColor="warning"
              tableHead={["Nome", "Descrição"]}
              tableData={listaReferencias}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
