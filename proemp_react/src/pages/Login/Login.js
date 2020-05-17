import React from 'react';
import firebase from 'firebase';

const Login = () => {

    const [ email, setEmail ] = React.useState("matheus.f.favari@gmail.com");
    const [ password, setPassword ] = React.useState("favari123");

    const onLogin = async () => {
        
        firebase.auth().signInWithEmailAndPassword(email, password).catch(()=>{
            alert('Usuário ou senha inválidos');
        });

    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    return(
        <>
            <form>
                <input 
                    placeholder="Email" 
                    value={email} 
                    onChange={handleEmail}
                    >
                </input>
                <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password}
                    onChange={handlePassword}
                >
                </input>
            </form>
            <button onClick={() => onLogin()}>Entrar</button>
        </>
    )
}

export default Login;