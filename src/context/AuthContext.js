import { createContext, useState } from 'react'
import { removeToken } from '../utils/token';

export const authContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(undefined);

    const logout = () => {
        removeToken();
        setAuth(null);
    }

    const setUser = (user) => {
        setAuth(user);
    }


    return (
        <authContext.Provider value={{
            auth,
            logout,
            setUser
        }}>
            {children}
        </authContext.Provider>
    )
} 

    export default AuthProvider;