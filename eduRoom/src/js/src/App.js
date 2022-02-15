import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StudentTable from './components/StudentTable';
import AddUserForm from './components/AddUserForm';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditUserForm from './components/EditUserForm';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {
        id: 0,
        name: "",
        surname: "",
        email: ""
      },
    }
  }

  handleEditUser = (newUser) => {
    this.setState({user: newUser});
  }

  render() {
    const {user} = this.state;

    return (
      <Container>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/users" element={<StudentTable handleEditUser={this.handleEditUser}/>} />
          <Route path="/addnewuser" element={<AddUserForm />} />
          <Route path="/edituser" element={<EditUserForm user={this.state.user}/>} />
        </Routes>
      </Container>
    );
  }
}

export default App;
