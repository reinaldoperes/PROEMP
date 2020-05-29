import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//icons
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import IconButton from '@material-ui/core/IconButton';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { Redirect } from "react-router-dom";
import firebase from 'firebase';

export default function ListarTipoDocumento() {
  const listaTipoDoc = [];
  var lista = [];
  const [listaTipo, setListaTipoDoc] = useState([]);
  const [novoTipoDoc, setNovoTipoDoc] = useState(false);
  const [editarTipoDoc, setEditarTipoDoc] = useState(false);
  const [keyTipoDoc, setKeyTipoDoc] = useState("");
  const [nomeTipoDoc, setNomeTipoDoc] = useState("");
  const [descTipoDoc, setDescTipoDoc] = useState("");

  const handleNovo = () => {
    setNovoTipoDoc(true);
  };

  const handleExcluir = key => {
    firebase
      .database()
      .ref("tipo_documento")
      .child(key)
      .remove();
  };

  const handleEditar = (key, nome, descricao) => {
    setKeyTipoDoc(key);
    setNomeTipoDoc(nome);
    setDescTipoDoc(descricao);
    setEditarTipoDoc(true);
  };

  function renderDivBotoes(key, nome, descricao) {
    return (
      <div style={{ display: "table", float: "right" }}>
        <div style={{ display: "table-cell", paddingRight: "5px" }}>
          {renderButtonEditar(key, nome, descricao)}
        </div>
        <div style={{ display: "table-cell", paddingRight: "5px" }}>
          {renderButtonExcluir(key)}
        </div>
      </div>
    );
  }

  function renderButtonExcluir(key) {
    return <IconButton color="warning" onClick={() => handleExcluir(key)}><DeleteIcon/></IconButton>;
  }

  function renderButtonEditar(key, nome, descricao) {
    return <IconButton color="warning" onClick={() => handleEditar(key, nome, descricao)}><EditIcon/></IconButton>;
  }

  if(novoTipoDoc){
    return <Redirect to="/admin/incluirtipodocumento" />;
  }

  if(editarTipoDoc){
    return <Redirect to={{
      pathname: '/admin/atualizartipodocumento',
      state: { key: keyTipoDoc, nome: nomeTipoDoc, descricao: descTipoDoc }
    }}/>;
  }

  firebase
    .database()
    .ref("tipo_documento")
    .once("value", snapshot => {
      snapshot.forEach(childItem => {
        listaTipoDoc.push({
          key: childItem.key,
          nome: childItem.val().nome,
          descricao: childItem.val().descricao
        });
      });
      return handleLista();
    });

  const handleLista = () => {
    listaTipoDoc.map(item => {
      lista = [
        ...lista,
        [
          item.nome,
          item.descricao,
          renderDivBotoes(item.key, item.nome, item.descricao)
        ]
      ];
    });

    setListaTipoDoc(lista);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="warning">
            <Button color="white" onClick={handleNovo}>
              Novo
            </Button>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={["Nome", "Descrição", "", ""]}
              tableData={listaTipo}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
