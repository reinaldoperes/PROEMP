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
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import firebase from "firebase";

// core components
import Admin from "./layouts/Admin.js";
import Login from "./views/Login/Login.js";
import Senha from "./views/Senha/Senha.js";
import User from "./views/UserProfile/UserProfile.js";
import ConfirmMessage from "./views/ConfirmMessage/ConfirmMessage.js";

import "./assets/css/material-dashboard-react.css?v=1.8.0";
import UserProvider from "./context/User";

const hist = createBrowserHistory();

// if (1 === 2) {
//   component = Admin;
//   path = "/admin";
// } else {
//   component = Login;
//   path = "/login";
// }

const firebaseConfig = {
  apiKey: "AIzaSyDSTzwJtgQ-kMZ2H6ur0J13v5VDuHYuJbE",
  authDomain: "proemp-bdf14.firebaseapp.com",
  databaseURL: "https://proemp-bdf14.firebaseio.com",
  projectId: "proemp-bdf14",
  storageBucket: "proemp-bdf14.appspot.com",
  messagingSenderId: "695825377875",
  appId: "1:695825377875:web:4f7500a638d4297f0974a6",
  measurementId: "G-VVZ2STX70Y"
};
if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

firebase.analytics();

ReactDOM.render(
  <UserProvider>
    <Router history={hist}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/login" component={Login} />
        <Route path="/recuperarSenha" component={Senha} />
        <Route path="/admin/user" component={User} />
        <Route path="/message/:type" component={ConfirmMessage} />
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  </UserProvider>,
  document.getElementById("root")
);
