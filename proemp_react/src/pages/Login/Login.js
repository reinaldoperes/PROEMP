import React from 'react';
import firebase from 'firebase';
import { useUser } from '../../hooks/useUser';

const Login = () => {
  
    const { user, setUser } = useUser();

    React.useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            setUser(user);
        });
      }, [setUser])

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