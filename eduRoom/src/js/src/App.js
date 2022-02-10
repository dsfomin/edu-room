import logo from './logo.svg';
import './App.css';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import React from 'react';
import { getAllStudents } from './client';
import { errorNotification } from './Notification';
import { Container } from '@mui/material';
import { Empty } from 'antd';

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

    if (students && students.length) {

      return (
        <Container>
          <StudentTable students={this.state.students} />
        </Container>
      );
    }

    return (
      <Container>
        <Empty description={
          <h1>No Students found</h1>
        } />
      </Container>
    );
  }
}

class StudentTable extends React.Component {

  render() {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>iD</TableCell>
              <TableCell align="left">Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.props.students.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell align="left">{row.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }
}

export default App;
