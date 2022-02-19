import { createContext, useState } from "react";
import { authenticateUser } from "../client";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {

    const [token, setToken] = useState("");

    const [user, setUser] = useState({
        password: null,
        email: null
    });

    const signin = (newUser, cb) => {
        authenticateUser(newUser)
        .then((response)=> {
            if (response.status===200) {
                setUser(newUser);
                cb();
            } else {
                console.log('Something Wrong! Please Try Again'); 
            }
            return response.json();
        })
        .then(data => {
            console.log(data.token);
            setToken(data.token);
        })
        .catch((err)=>{
            console.log("Credencials are wrong ,", user, err);
        });
    }

    const signout = (cb) => {
        setUser({password: null, email: null});
        setToken("");
        cb();
    }

    const value = {user, signin, signout, token}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}