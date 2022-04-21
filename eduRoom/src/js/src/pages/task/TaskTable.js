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
import { Link, useParams } from "react-router-dom";
import { getAllTasksByCourse, deleteTask } from '../../client';
import { useAuth } from '../../hook/useAuth';

export default function TaskTable() {
  const { token } = useAuth();
  const [tasks, setTasks] = useState([])
  const { id } = useParams();

  useEffect(() => {
    getAllTasksByCourse(token, id)
      .then(res => res.json()
        .then(data => setTasks([...data])))
      .catch(error => {
        console.log(error);
      });
  }, [id])

  const delTask = (taskId) => {
    deleteTask(taskId, token).catch(err => {
      console.log('Delete Course: Something went wrong', err);
    });
    window.location.reload(false);
  }

  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={"/add-new-task/" + id}
      >
        <Button
          sx={{ my: 2, color: 'green', display: 'block' }}
          variant="outlined"
          startIcon={<AddCircleOutlineIcon />}>
          Add Task
        </Button>
      </Link>



      <TableContainer component={Paper} sx={{ width: 1, mt: 1 }}>
        {(tasks && tasks.length)
          ? <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Task</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell>Expires At</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Look-up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow
                  key={task.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="task">{task.id}</TableCell>
                  <TableCell>{task.task}</TableCell>
                  <TableCell>{task.createdAt}</TableCell>
                  <TableCell>{task.expiresAt}</TableCell>
                  <TableCell>
                    <Button onClick={() => delTask(task.id)} variant="outlined" startIcon={<DeleteIcon />}>Delete Task</Button>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/edit-task/${id}/${task.id}`}
                    >
                      <Button variant="outlined" startIcon={<ModeEditIcon />}>Edit Task</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/task-page/${task.id}`}
                    >
                      <Button variant="outlined" startIcon={<ModeEditIcon />}>Task Page</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          : <Empty description={
            <Typography component={'span'} variant={'body2'}>No Courses found</Typography>
          } />
        }
      </TableContainer>
    </>
  );
}