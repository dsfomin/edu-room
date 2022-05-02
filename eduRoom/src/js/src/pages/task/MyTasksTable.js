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
import { getAllMyTasks } from '../../client';
import { useAuth } from '../../hook/useAuth';

export default function MyTaskTable() {
    const { id, token } = useAuth();

    const [taskProgresses, setTaskProgresses] = useState([{
        id: "",
        task: {
            id: "",
            task: "",
            createdAt: "",
            expiresAt: "",
            course: {id: "",},
        },
        taskStatus: "",
        lastUpdate: "",
    }]);

    useEffect(() => {
        getAllMyTasks(id, token)
            .then(res => res.json()
                .then(data => setTaskProgresses([...data])))
            .catch(error => {
                console.log(error);
            });
    }, [id, token])

    return (
        <>
            <TableContainer component={Paper} sx={{ width: 1, mt: 1 }}>
                {(taskProgresses && taskProgresses.length)
                    ? <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Task</TableCell>
                                <TableCell>Expires At</TableCell>
                                <TableCell>Last Update</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Task Page</TableCell>
                                <TableCell>Course Page</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {taskProgresses.map((taskProgress) => (
                                <TableRow
                                    key={taskProgress.task.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell scope="taskProgress">{taskProgress.task.id}</TableCell>
                                    <TableCell>{taskProgress.task.task}</TableCell>
                                    <TableCell>{taskProgress.task.expiresAt}</TableCell>
                                    <TableCell>{taskProgress.lastUpdate}</TableCell>
                                    <TableCell>{taskProgress.taskStatus}</TableCell>
                                    <TableCell>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/task-page/${taskProgress.task.id}`}
                                        >
                                            <Button variant="outlined" startIcon={<ModeEditIcon />}>Task Page</Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            style={{ textDecoration: "none" }}
                                            to={`/course-page/${taskProgress.task.course.id}`}
                                        >
                                            <Button variant="outlined" startIcon={<ModeEditIcon />}>Course Page</Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : <Empty description={
                        <Typography component={'span'} variant={'body2'}>You don't have tasks! Participate on some course!</Typography>
                    } />
                }
            </TableContainer>
        </>
    );
}