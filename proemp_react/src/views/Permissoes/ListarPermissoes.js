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

export default function ListarPermissoes() {
  const listapermissao = [];
  var lista = [];
  const [listaTipo, setListapermissao] = useState([]);
  const [novopermissao, setNovopermissao] = useState(false);
  const [editarpermissao, setEditarpermissao] = useState(false);
  const [keypermissao, setKeypermissao] = useState("");
  const [usuarioPermissao, setUsuariopermissao] = useState("");

  const handleNovo = () => {
    setNovopermissao(true);
  };

  const handleExcluir = key => {
    firebase
      .database()
      .ref("permissao")
      .child(key)
      .remove();
  };

  const handleEditar = (key, usuario) => {
    setKeypermissao(key);
    setUsuariopermissao(usuario);
    setEditarpermissao(true);
  };

  function renderDivBotoes(key, usuario) {
    return (
      <div style={{ display: "table", float: "right" }}>
        <div style={{ display: "table-cell", paddingRight: "5px" }}>
          {renderButtonEditar(key, usuario)}
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

  function renderButtonEditar(key, usuario) {
    return <IconButton color="warning" onClick={() => handleEditar(key,usuario)}><EditIcon/></IconButton>;
  }

  if(novopermissao){
    return <Redirect to="/admin/incluirpermissao" />;
  }

  if(editarpermissao){
    return <Redirect to={{
      pathname: '/admin/atualizarpermissao',
      state: { key: keypermissao, usuario: usuarioPermissao }
    }}/>;
  }

  firebase
    .database()
    .ref("permissao")
    .once("value", snapshot => {
      snapshot.forEach(childItem => {
        listapermissao.push({
          key: childItem.key,
          usuario: childItem.val().usuario,
          tipodocumento: childItem.val().tipodocumento,
          referencia: childItem.val().referencia,
        });
      });
      return handleLista();
    });

  const handleLista = () => {
    listapermissao.map(item => {
      lista = [
        ...lista,
        [
          item.usuario,
          renderDivBotoes(item.key, item.usuario)
        ]
      ];
    });

    setListapermissao(lista);
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
              tableHead={["Usuário", ""]}
              tableData={listaTipo}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
