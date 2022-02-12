import logo from './logo.svg';
import './App.css';
import React from 'react';
import { getAllUsers, addNewUser } from './client';
import { errorNotification } from './Notification';
import { Container } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StudentTable from './components/StudentTable';
import AddUserForm from './components/AddUserForm';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [],
      isFetching: false,
    }

    this.fetchStudents = this.fetchStudents.bind(this);
  }

  componentDidMount() {
    this.fetchStudents();
  }

  fetchStudents() {
    this.setState({
      isFetching: true
    });
    getAllUsers()
      .then(res => res.json()
        .then(students => {
          console.log(students);
          this.setState({
            students,
            isFetching: false
          });
        }))
      .catch(error => {
        console.log(error.error);
        const message = error.error.message;
        const description = error.error.error;
        errorNotification(message, description);
        this.setState({
          isFetching: false
        });
      });
  }

  render() {
    const { students } = this.state;

    return (
      
      <Container>
        <ResponsiveAppBar/>
        <StudentTable fetchStudents={this.fetchStudents} students={students}/>
        <AddUserForm addUser={addNewUser}></AddUserForm>
      </Container>
    );
  }
}

export default App;
