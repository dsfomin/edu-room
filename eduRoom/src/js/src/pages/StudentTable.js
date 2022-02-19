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
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { deleteUser, getAllUsers } from '../client';
import { useAuth } from '../hook/useAuth';

export default function StudentTable() {
  const {token} = useAuth();
  const [students, setStudents] = useState([])

  useEffect(() => {
    getAllUsers(token)
      .then(res => res.json()
        .then(data => setStudents([...data])))
      .catch(error => {
        console.log(error);
      });
  }, [])


  const delUser = (userId, token) => {
    deleteUser(userId, token).catch(err => {
      console.log('Delete User: Something went wrong', err);
    });
  }

  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={"/addnewuser"}
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
                    <Button onClick={() => delUser(user.id, token)} variant="outlined" startIcon={<DeleteIcon />}>Delete User</Button>
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