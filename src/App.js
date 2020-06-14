import React from 'react';
import firebase from 'firebase'
import Teste from './pages/Teste';
import UserProvider from './context/User';

const App = () =>{

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
  
  return(
    <UserProvider>
      <Teste />
    </UserProvider>
  );
};
  
export default App;