import React from "react";
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
import TextField from '@material-ui/core/TextField';
import { Redirect } from "react-router-dom";
import firebase from 'firebase'

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

export default function IncluirTipoDocumento() {
  const classes = useStyles();
  const [voltar, setVoltar] = React.useState(false);
  
  const handleCancelar = () =>{
    setVoltar(true);
  };

  const handleSubmit = event => {
    event.preventDefault();
    
    let nome = document.getElementsByName('nome')[0].value
    let descricao = document.getElementsByName('descricao')[0].value

    let tipodoc = firebase.database().ref('tipo_documento');
    let chave = tipodoc.push().key;

    tipodoc.child(chave).set({
      nome: nome,
      descricao: descricao
    });
    setVoltar(true);
  };

  if(voltar){
    return <Redirect to="/admin/tipodocumento" />;
  }

  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Incluir Tipo Documento</h4>
              <p className={classes.cardCategoryWhite}> </p>
            </CardHeader>
            <CardBody>
            <form onSubmit={handleSubmit}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                <TextField required id="nome" name="nome" fullWidth label="Nome" />                
                </GridItem>
              </GridContainer>
              <br />
              <GridContainer>
                <GridItem xs={12} sm={12} md={8}>
                  <textarea                    
                    style={{ height: '100px' }}
                    id="descricao"
                    name="descricao"
                    placeholder="Descrição"
                    required
                    maxLength="100"
                    style={{width:"100%", height:"150%"}}
                  />
                </GridItem>
              </GridContainer>
              <br /><br />
              <Button type="submit" color="warning">Incluir</Button>
              <Button type="button" onClick={handleCancelar} color="danger">Cancelar</Button>
            </form>                    
            </CardBody>
          </Card>
        </GridItem>      
      </GridContainer>
    </div>
  );
}
