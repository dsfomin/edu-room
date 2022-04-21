import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';

import ResponsiveAppBar from './pages/ResponsiveAppBar';
import StudentTable from './pages/user/StudentTable';
import AddTeacherForm from './pages/user/AddTeacherForm';
import HomePage from './pages/Home';
import EditUserForm from './pages/user/EditUserForm';
import Login from './pages/user/Login';
import RegisterPage from './pages/user/RegisterPage';
import CourseTable from './pages/course/CourseTable';
import ProfilePage from './pages/user/ProfilePage';
import AddCourseForm from './pages/course/AddCourseForm';
import EditCourseForm from './pages/course/EditCourseForm';
import CoursePage from './pages/course/CoursePage';
import TaskPage from './pages/task/TaskPage';
import AddTaskForm from './pages/task/AddTaskForm';
import TaskTable from './pages/task/TaskTable';
import EditTaskForm from './pages/task/EditTaskForm';

import RequireUserAuth from './hoc/RequireUserAuth';
import RequireAdminAuth from './hoc/RequireAdminAuth';
import RequireTeacherAuth from './hoc/RequireTeacherAuth';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MyTaskTable from './pages/task/MyTasksTable';

function App() {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ResponsiveAppBar />
      <Container>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<RequireUserAuth><ProfilePage/></RequireUserAuth>} />
          <Route path="/courses" element={<RequireUserAuth><CourseTable/></RequireUserAuth>} />
          <Route path="/tasks/:id" element={<RequireUserAuth><TaskTable/></RequireUserAuth>} />
          <Route path="/task-page/:taskId" element={<RequireUserAuth><TaskPage/></RequireUserAuth>} />
          <Route path="/course-page/:id" element={<RequireUserAuth><CoursePage/></RequireUserAuth>} />
          <Route path="/add-new-course" element={<RequireTeacherAuth><AddCourseForm/></RequireTeacherAuth>} />
          <Route path="/add-new-task/:id" element={<RequireTeacherAuth><AddTaskForm/></RequireTeacherAuth>} />
          <Route path="/edit-course/:id" element={<RequireTeacherAuth><EditCourseForm/></RequireTeacherAuth>} />
          <Route path="/edit-task/:courseId/:id" element={<RequireTeacherAuth><EditTaskForm/></RequireTeacherAuth>} />
          <Route path="/users" element={<RequireAdminAuth><StudentTable/></RequireAdminAuth>} />
          <Route path="/edit-user/:id" element={<RequireAdminAuth><EditUserForm/></RequireAdminAuth>} />
          <Route path="/add-new-teacher" element={<RequireAdminAuth><AddTeacherForm/></RequireAdminAuth>} />
          <Route path="/my-tasks" element={<RequireUserAuth><MyTaskTable/></RequireUserAuth>} />
        </Routes>
      </Container>
    </LocalizationProvider>
  );
}

export default App;
