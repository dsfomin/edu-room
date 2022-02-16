import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Empty } from 'antd';
import React from 'react';
import { Link } from "react-router-dom";
import { deleteUser, getAllUsers } from '../client';
import { errorNotification } from '../Notification';

class StudentTable extends React.Component {
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


  deleteUser = (userId) => {
    deleteUser(userId).then(() => this.fetchStudents()).catch(err => {
      console.log('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }

  render() {
    const { students } = this.state;

    return (
      <>
        <Link
          style={{ textDecoration: "none" }}
          to="/addnewuser"
        >
          <Button sx={{ mt: 2 }} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
            Add User
          </Button>
        </Link>

        <TableContainer component={Paper} sx={{ width: 1, mt: 1 }}>
          {(students && students.length)
            ? <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell />
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell scope="user">{user.id}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Button onClick={() => this.deleteUser(user.id)} variant="outlined" startIcon={<DeleteIcon />}>Delete User</Button>
                    </TableCell>
                    <TableCell>
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/edituser/${user.id}`}

                      >
                        <Button variant="outlined" startIcon={<ModeEditIcon />}>Edit User</Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            : <Empty description={
              <Typography component={'span'} variant={'body2'}>No Students found</Typography>
            } />
          }
        </TableContainer>
      </>
    );
  }
}

export default StudentTable;