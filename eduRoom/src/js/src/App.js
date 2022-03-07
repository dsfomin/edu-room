import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from './pages/ResponsiveAppBar';
import StudentTable from './pages/StudentTable';
import AddTeacherForm from './pages/AddTeacherForm';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import EditUserForm from './pages/EditUserForm';
import Login from './pages/Login';
import RegisterPage from './pages/RegisterPage';
import RequireAdminAuth from './hoc/RequireAdminAuth';
import RequireUserAuth from './hoc/RequireUserAuth';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <>
      <ResponsiveAppBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<RequireUserAuth><ProfilePage/> </RequireUserAuth>} />
          {/* <Route path="/courses" element={<RequireUserAuth><CourseTable /></RequireUserAuth>} /> */}
          <Route path="/users" element={<RequireAdminAuth><StudentTable /></RequireAdminAuth>} />
          <Route path="/edituser/:id" element={<RequireAdminAuth><EditUserForm/></RequireAdminAuth>} />
          <Route path="/addnewteacher" element={<RequireAdminAuth><AddTeacherForm /></RequireAdminAuth>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
