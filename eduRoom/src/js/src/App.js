import logo from './logo.svg';
import './App.css';
import React  from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StudentTable from './components/StudentTable';
import AddUserForm from './components/AddUserForm';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import EditUserForm from './components/EditUserForm';

class App extends React.Component {

  render() {
    return (
      <>
        <ResponsiveAppBar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<StudentTable/>} />
            <Route path="/addnewuser" element={<AddUserForm />} />
            <Route path="/edituser/:id" element={<EditUserForm/>} />
          </Routes>
        </Container>
      </>
    );
  }
}

export default App;
