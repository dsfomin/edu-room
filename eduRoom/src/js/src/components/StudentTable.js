import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Empty } from 'antd';
import { Button, Typography } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link } from "react-router-dom";
import { deleteUser } from '../client';

class StudentTable extends React.Component {
  deleteUser = (userId) => {
    deleteUser(userId).then(() => this.props.fetchStudents()).catch(err => {
      console.log('error', 'error', `(${err.error.status}) ${err.error.error}`);
    });
  }


  render() {
    return (
      <TableContainer component={Paper} sx={{ width: 1, mt: 10 }}>
        <Link to="/addnewuser"><Button variant="outlined" startIcon={<AddCircleOutlineIcon />}>Add User</Button></Link>
        {(this.props.students && this.props.students.length)
          ? <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.props.students.map((user) => (
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
                    <Button variant="outlined" startIcon={<ModeEditIcon />}>Edit User</Button>
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
    );
  }
}

export default StudentTable;