import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { addNewTeacher } from "../../client";
import { useAuth } from "../../hook/useAuth";

export default function AddTeacherForm() {
    const navigate = useNavigate();
    const {token} = useAuth();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewTeacher(user, token);
        navigate('/users');
        setUser({ name: "", surname: "", email: "" , password: ""});
    };

    return (
        <Paper>
            <h2>Create Teacher Form</h2>
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
            <Button onClick={handleSubmit}>Create Teacher</Button>
        </Paper>
    )
}


