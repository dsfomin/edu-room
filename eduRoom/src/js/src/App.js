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
import CourseTable from './pages/CourseTable';
import RequireAdminAuth from './hoc/RequireAdminAuth';
import RequireUserAuth from './hoc/RequireUserAuth';
import ProfilePage from './pages/ProfilePage';
import AddCourseForm from './pages/AddCourseForm';
import RequireTeacherAuth from './hoc/RequireTeacherAuth';
import EditCourseForm from './pages/EditCourseForm';
import CoursePage from './pages/CoursePage';

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
          <Route path="/courses" element={<RequireUserAuth><CourseTable /></RequireUserAuth>} />
          <Route path="/course-page/:id" element={<RequireUserAuth><CoursePage/></RequireUserAuth>} />
          <Route path="/add-new-course" element={<RequireTeacherAuth><AddCourseForm /></RequireTeacherAuth>} />
          <Route path="/edit-course/:id" element={<RequireTeacherAuth><EditCourseForm/></RequireTeacherAuth>} />
          <Route path="/users" element={<RequireAdminAuth><StudentTable /></RequireAdminAuth>} />
          <Route path="/edit-user/:id" element={<RequireAdminAuth><EditUserForm/></RequireAdminAuth>} />
          <Route path="/add-new-teacher" element={<RequireAdminAuth><AddTeacherForm /></RequireAdminAuth>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
