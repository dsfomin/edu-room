import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button, Box, Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { updateUser } from '../client';


export default class EditUserForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: this.props.user.name,
                surname: this.props.user.surname,
                email: this.props.user.email,
            },
        }
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeSurname = this.handleChangeSurname.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
    }

    handleChangeName(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                name: event.target.value
            }
        }))
    }

    handleChangeSurname(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                surname: event.target.value
            }
        }))
    }

    handleChangeEmail(event) {
        this.setState(prevState => ({
            user: {
                ...prevState.user,
                email: event.target.value
            }
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault();
        updateUser(this.props.user.id, this.state.user);
        console.log(this.props.user.id, this.state.user);
        this.setState({ name: "", surname: "", email: "" });
    };

    render() {

        return (
            <>
                <Paper>
                    <h2>Edit User Form</h2>
                    <TextField
                        value={this.state.user.name}
                        label={"Name"}
                        onChange={this.handleChangeName}
                    />
                    <TextField
                        value={this.state.user.surname}
                        label={"Surname"}
                        onChange={this.handleChangeSurname}
                    />
                    <TextField
                        value={this.state.user.email}
                        label={"Email"}
                        onChange={this.handleChangeEmail}
                    />
                    <Typography />
                    <Button onClick={this.handleSubmit}>Update User</Button>
                </Paper>
            </>
        )
    }
}


