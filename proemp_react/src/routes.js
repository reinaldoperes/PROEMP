/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Send from "@material-ui/icons/Send";
import Mail from "@material-ui/icons/Mail";
import List from "@material-ui/icons/List";
import Business from "@material-ui/icons/Business";
import Group from "@material-ui/icons/Group";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Unarchive from "@material-ui/icons/Unarchive";
import Language from "@material-ui/icons/Language";
import Fingerprint from "@material-ui/icons/Fingerprint";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableListCaixaEntrada from "views/TableList/TableListCaixaEntrada.js";
import TableListEnviados from "views/TableList/TableListEnviados.js";
import TableListDocumentos from "views/TableList/TableListDocumentos.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
import ListarTipoDocumento from "./views/TipoDocumento/ListarTipoDocumento.js";
import ListarReferencia from "./views/Referencia/ListarReferencia.js";
import ListaUsuario from "views/Usuarios/ListaUsuario.js";
import ListarPermissoes from "./views/Permissoes/ListarPermissoes";

const dashboardRoutes = [
  /*{
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },*/
  {
    path: "/user",
    name: "Perfil",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/entrada",
    name: "Caixa de entrada",
    icon: Mail,
    component: TableListCaixaEntrada,
    layout: "/admin"
  },
  {
    path: "/enviados",
    name: "Enviados",
    icon: Send,
    component: TableListEnviados,
    layout: "/admin"
  },
  /*{
    path: "/documentos",
    name: "Documentos",
    icon: "content_paste",
    component: TableListDocumentos,
    layout: "/admin"
  },*/
  {
    path: "/tipodocumento",
    name: "Tipo Documento",
    icon: List,
    component: ListarTipoDocumento,
    layout: "/admin"
  },
  {
    path: "/referencia",
    name: "Referência",
    icon: Business,
    component: ListarReferencia,
    layout: "/admin"
  },
  {
    path: "/listaUsuario",
    name: "Usuários",
    icon: Group,
    component: ListaUsuario,
    layout: "/admin"
  },
  /*{
    path: "/permissoes",
    name: "Permissões",
    icon: Fingerprint,
    component: ListarPermissoes,
    layout: "/admin"
  },*/
];

export default dashboardRoutes;
