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
import { blockUser, unblockUser, deleteUser, getAllUsers } from '../../client';
import { useAuth } from '../../hook/useAuth';

export default function StudentTable() {
  const { token } = useAuth();
  const [students, setStudents] = useState([])

  useEffect(() => {
    getAllUsers(token)
      .then(res => res.json()
        .then(data => setStudents([...data])))
      .catch(error => {
        console.log(error);
      });
  }, [token])


  const deleteUsr = (userId, token) => {
    deleteUser(userId, token).catch(err => {
      console.log('Delete User: Something went wrong', err);
    });
    window.location.reload(false);
  }

  const blockUsr = (userId, token) => {
    blockUser(userId, token).catch(err => {
      console.log('Block User: Something went wrong', err);
    });
    window.location.reload(false);
  }

  const unblockUsr = (userId, token) => {
    unblockUser(userId, token).catch(err => {
      console.log('Unblock User: Something went wrong', err);
    });
    window.location.reload(false);
  }

  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={"/add-new-teacher"}
      >
        <Button sx={{ mt: 2 }} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
          Add Teacher
        </Button>
      </Link>

      <TableContainer component={Paper} sx={{ width: 1, mt: 1 }}>
        {(students && students.length)
          ? <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Surname</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Authorities</TableCell>
                <TableCell>Activity</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Update</TableCell>
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
                  <TableCell>{user.surname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.authorities.map((authority, idx) => <li key={idx}>{authority}</li>)}</TableCell>
                  <TableCell>
                    {user.isActive ?
                    <Button onClick={() => blockUsr(user.id, token)} variant="outlined" startIcon={<ModeEditIcon />}>Block User</Button> :
                    <Button onClick={() => unblockUsr(user.id, token)} variant="outlined" startIcon={<ModeEditIcon />}>Unblock User</Button>}
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => deleteUsr(user.id, token)} variant="outlined" startIcon={<DeleteIcon />}>Delete User</Button>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/edit-user/${user.id}`}
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