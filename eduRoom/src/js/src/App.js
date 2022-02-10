import logo from './logo.svg';
import './App.css';
import React from 'react';
import { getAllStudents } from './client';
import { errorNotification } from './Notification';
import { Container } from '@mui/material';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import StudentTable from './components/StudentTable';

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
    getAllStudents()
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
        <ResponsiveAppBar></ResponsiveAppBar>
        <StudentTable students={students}></StudentTable>
      </Container>
    );
  }
}

export default App;
