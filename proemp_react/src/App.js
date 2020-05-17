import React, {Component} from 'react';
import firebase from 'firebase'

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      usuarios: [],
    };

    let firebaseConfig = {
      apiKey: "AIzaSyC9RLFXvNNGIr1_nVY_ERED42dBsiy6Jm8",
      authDomain: "proemp-9d169.firebaseapp.com",
      databaseURL: "https://proemp-9d169.firebaseio.com",
      projectId: "proemp-9d169",
      storageBucket: "proemp-9d169.appspot.com",
      messagingSenderId: "109471063554",
      appId: "1:109471063554:web:c64cd7736c3ce8843f111b",
      measurementId: "G-VBJFHWJ0NG"
    };
    // Initialize Firebase
    if (!firebase.apps.length)
      firebase.initializeApp(firebaseConfig);
    
    firebase.analytics();

    //real time
    /*firebase.database().ref('usuarios').on('value', (snapshot) => {
      let state = this.state;
      state.usuarios = snapshot.val();
      this.setState(state);
    });    */

    //uma vez
    firebase.database().ref('usuarios').once('value').then((snapshot) => {
      let state = this.state;
      state.usuarios = snapshot.val();
      this.setState(state);
      console.log(this.state.usuarios);
    });
  }

  render(){
    //const { login } = this.s

    return(
      <div>
        <h1>funfando</h1>
      </div>
    );
  }
};
