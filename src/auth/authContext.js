import React, {useState, useEffect, createContext} from "react";
import { auth } from './authProviders';

export const AuthContext = createContext(false);

const AuthUserContext = (props) => {

    const [user, setUser] = useState(false);

    useEffect(() => {

        auth.onAuthStateChanged(newUser => {
            try {
                const { displayName, email, uid } = newUser;
                setUser({ displayName, email, uid });

            } catch (error) {}
        });
        
    }, []);

    return (
        <AuthContext.Provider value={user}>{props.children}</AuthContext.Provider>
    )

}

export default AuthUserContext;