import React from 'react';
import firebase from 'firebase';

const Dashboard = () => {
    return(
        <>
            <div>Logado</div>
            <button 
            onClick={() => { 
                firebase.auth().signOut();
            }}>Sair</button>
        </>
    )
}

export default Dashboard;