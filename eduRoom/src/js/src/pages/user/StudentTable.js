import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Box, Button, Typography } from '@mui/material';
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
import { blockUser, unblockUser, deleteUser } from '../../client';
import { useAuth } from '../../hook/useAuth';
import UserService from '../../services/user.service';
import { Pagination, TextField } from '@mui/material';


export default function StudentTable() {
  const { token } = useAuth();
  const [students, setStudents] = useState({
    content: [],
    pageNo: 0,
    pageSize: 2,
    order: "asc",
    sortBy: "id",
    totalElements: "",
    totalPages: "",
  })

  useEffect(() => {
    UserService.getAll(token, new URLSearchParams({
      "pageNo": students.pageNo,
      "pageSize": students.pageSize,
      "order": students.order,
      "sortBy": students.sortBy
    }))
      .then(res => setStudents(res.data))
      .catch((e) => {
        console.log(e);
      });
  }, [token, students.pageNo, students.pageSize, students.order, students.sortBy])


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
      <Box component="div" sx={{ display: 'flex' }}>
        <Link
          style={{ textDecoration: "none" }}
          to={"/add-new-teacher"}
        >
          <Button sx={{ mt: 2 }} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
            Add Teacher
          </Button>
        </Link>
        <span className="table-spacer"/>
        <TextField id="table-search" type="search" label="Search" variant="outlined" />
      </Box>

      {(students.content && students.content.length) ?
        <>
          <TableContainer component={Paper} sx={{ width: 1, mt: 1 }}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell onClick={() => setStudents({ ...students, sortBy: "id" })}>ID</TableCell>
                  <TableCell onClick={() => setStudents({ ...students, sortBy: "name" })}>Name</TableCell>
                  <TableCell onClick={() => setStudents({ ...students, sortBy: "surname" })}>Surname</TableCell>
                  <TableCell onClick={() => setStudents({ ...students, sortBy: "email" })}>Email</TableCell>
                  <TableCell>Authorities</TableCell>
                  <TableCell>Activity</TableCell>
                  <TableCell>Delete</TableCell>
                  <TableCell>Update</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.content.map((user) => (
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
          </TableContainer>
          <Pagination
            page={students.pageNo + 1}
            count={students.totalPages}
            onChange={(event, value) => setStudents({ ...students, pageNo: value - 1 })}
          />
        </>
        : <Empty description={
          <Typography component={'span'} variant={'body2'}>No Students found</Typography>
        } />
      }
    </>
  );
}