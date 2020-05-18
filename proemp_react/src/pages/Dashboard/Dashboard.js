import React from 'react';
import firebase from 'firebase';
import { useUser } from '../../hooks/useUser';

const Dashboard = () => {
    const { setUser } = useUser();    
    return(
        <>
            <div>Logado</div>
            <button 
            onClick={() => { 
                firebase.auth().signOut();
                setUser(null)
            }}>Sair</button>
        </>
    )
}

export default Dashboard;