import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from './pages/ResponsiveAppBar';
import StudentTable from './pages/StudentTable';
import AddUserForm from './pages/AddUserForm';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import EditUserForm from './pages/EditUserForm';
import Login from './pages/Login';
import RequireAuth from './hoc/RequireAuth';
import AuthProvider from './hoc/AuthProvider';

class App extends React.Component {

  render() {
    return (
      <AuthProvider>
        <ResponsiveAppBar />
        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<StudentTable />} />
            <Route path="/edituser/:id" element={<EditUserForm />} />
            <Route path='/login' element={<Login />} />
            <Route path="/addnewuser" element={
              <RequireAuth>
                <AddUserForm />
              </RequireAuth>
            } />
          </Routes>
        </Container>
      </AuthProvider>
    );
  }
}

export default App;
