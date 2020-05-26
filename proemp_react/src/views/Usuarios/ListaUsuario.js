import React from "react";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import firebase from "firebase";
import { Redirect } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";

const ListaUsuario = () => {
  var userList = [];
  const [userList2, setList] = React.useState([]);
  const [novaRef, setNovaref] = React.useState(false);
  const [editarUser, setEditarUser] = React.useState(null);

  firebase
    .database()
    .ref("usuarios")
    .once("value", snapshot => {
      snapshot.forEach(user => {
        userList.push([
          ...Object.values(user.val()),
          renderButtonEditar(user.val()),
          renderButtonExcluir(user.key)
        ]);
      });
    })
    .then(() => {
      setList(userList);
    });

  const handleExcluir = key => {
    firebase
      .database()
      .ref("usuarios")
      .child(key)
      .remove();
  };

  const handleEditar = user => {
    setEditarUser(user);
  };

  const renderButtonExcluir = key => (
    <IconButton color="warning" onClick={() => handleExcluir(key)}>
      <DeleteIcon />
    </IconButton>
  );

  const renderButtonEditar = (key, nome, descricao) => (
    <IconButton
      color="warning"
      onClick={() => handleEditar(key, nome, descricao)}
    >
      <EditIcon />
    </IconButton>
  );

  if (editarUser) {
    return (
      <Redirect
        to={{
          pathname: "/admin/updateUser",
          state: editarUser
        }}
      />
    );
  }

  if (novaRef) {
    return <Redirect to="/admin/novoUsuario" />;
  }

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="warning">
            <Button color="white" onClick={() => setNovaref(true)}>
              Novo
            </Button>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="warning"
              tableHead={[
                "CPF",
                "Email",
                "Nome",
                "Referência",
                "Telefone",
                "",
                ""
              ]}
              tableData={userList2}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
};

export default ListaUsuario;
