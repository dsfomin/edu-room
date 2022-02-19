import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button, Box } from "@mui/material";
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from "../client";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        registerUser(user);
        navigate('/login');
        setUser({ name: "", surname: "", email: "", password: ""});
    };

    return (
        <Paper>
            <h2>Create User Form</h2>
            <TextField
                value={user.name}
                label={"Name"}
                onChange={e => setUser({ ...user, name: e.target.value })}
            />
            <TextField
                value={user.surname}
                label={"Surname"}
                onChange={e => setUser({ ...user, surname: e.target.value })}
            />
            <TextField
                value={user.email}
                label={"Email"}
                onChange={e => setUser({ ...user, email: e.target.value })}
            />
            <TextField
                value={user.password}
                label={"Password"}
                onChange={e => setUser({ ...user, password: e.target.value })}
            />
            <Typography />
            <Button onClick={handleSubmit}>Register</Button>
            <Box>
                    <Typography>Already have account? </Typography>
                    <Link to={"/login"}>Sign In</Link>

            </Box>
        </Paper>
    )
}


