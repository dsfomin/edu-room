import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";

export default function AddUserForm({ addUser }) {

    const [user, setUser] = useState({
        name: "",
        surname: "",
        email: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        addUser(user);
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


        /* <form onSubmit={handleSubmit}>
            <label for="name">Name</label>
            <input
                type="text"
                value={user.name}
                name="name"
                onChange={e => setUser({ ...user, name: e.target.value })}
            />
            <br />
            <label for="surname">Surname</label>
            <input
                type="text"
                value={user.surname}
                name="surname"
                onChange={e => setUser({ ...user, surname: e.target.value })}
            />
            <br />
            <label for="email">Email</label>
            <input
                type="text"
                value={user.email}
                name="email"
                onChange={e => setUser({ ...user, email: e.target.value })}
            />
            <br />
            <input
                type="submit"
                value={"Create User"}
            />
        </form> */
    )
}


