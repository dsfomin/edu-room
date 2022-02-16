import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { addNewUser } from '../client';

export default function AddUserForm() {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewUser(user);
        navigate('/users');
        setUser({ name: "", surname: "", email: "" });
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
            <Typography />
            <Button onClick={handleSubmit}>Create User</Button>
        </Paper>
    )
}


