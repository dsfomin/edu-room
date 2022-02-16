import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({children}) {

    const db = {
        password: "1",
        email: "1"
    }

    const [user, setUser] = useState({
        password: null,
        email: null
    });

    const signin = (newUser, cb) => {
        if (newUser.email === db.email &&
            newUser.password === db.password) {
                setUser(newUser);
                cb();
             }
        else {
            console.log("Credencials r wrong ,", user);
        }
    }

    const signout = (cb) => {
        setUser({password: null, email: null});
        cb();
    }

    const value = {user, signin, signout}

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}