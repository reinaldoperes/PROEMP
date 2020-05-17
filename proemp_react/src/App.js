import React from 'react';
import firebase from 'firebase'
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

const App = () =>{
  
  // const [ usuarios, setUsuarios ] = React.useState([]);
  const [ currentUser, setCurrentuser ] = React.useState({});
  const [ showLogin, setShowLogin ] = React.useState(false);

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
  if (!firebase.apps.length)
  firebase.initializeApp(firebaseConfig);
  
  firebase.analytics();
  
  React.useEffect(() => {
    
    //uma vez
    // firebase.database().ref('usuarios').once('value').then((snapshot) => {
    //   setUsuarios(snapshot.val());
    //   console.log(usuarios);
    // });

    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setCurrentuser(user);
      }
    });
  }, [firebase.auth().currentUser])

  const onLogout = () => {
    setCurrentuser({});
  }
  
  return(
    <div>
      {currentUser?
      <Dashboard />:
      <Login />
      }
    </div>
  );
};
  
export default App;