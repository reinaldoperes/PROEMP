import React from 'react';
import { useUser } from '../../hooks/useUser';
import Dashboard from '../Dashboard';
import Login from '../Login';

const Teste = () => {

    const { user } = useUser();

    return(
       <>
        {user
            ?<Dashboard />
            :<Login />
        }
       </>
    )
}

export default Teste;