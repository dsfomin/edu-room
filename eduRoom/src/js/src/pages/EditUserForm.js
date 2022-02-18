import React, { useEffect } from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { findUser, updateUser } from '../client';
import { useAuth } from "../hook/useAuth";


export default function EditUserForm() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {token} = useAuth();

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: ""
    })

    useEffect(() => {
        findUser(id, token)
        .then(res => res.json())
        .then(data => setUser(data))
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        updateUser(id, user, token);
        navigate('/users')
        setUser({ name: "", surname: "", email: "" })
    };


    return (
        <>
            <Paper>
                <h2>Edit User Form</h2>
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
                <Button onClick={handleSubmit}>Update User</Button>
            </Paper>
        </>
    )
}



