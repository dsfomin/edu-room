import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();

    const fromPage = location.state?.from?.pathname || '/'

    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        signin(user, () => navigate(fromPage, { replace: true }))
    };

    return (
        <>
            <Paper>
                <h2>Login</h2>
                <TextField
                    defaultValue={user.email}
                    onChange={e => setUser({ ...user, email: e.target.value })}
                    label={"Email"}
                />
                <TextField
                    defaultValue={user.password}
                    label={"Password"}
                    onChange={e => setUser({ ...user, password: e.target.value })}
                />
                <Typography />
                <Button onClick={handleSubmit}>Sign In</Button>
            </Paper>
        </>
    )
}