import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { addNewTask } from "../../client";
import { useAuth } from "../../hook/useAuth";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

export default function AddTaskForm() {
    const navigate = useNavigate();
    const { token } = useAuth();
    const { id } = useParams();
    const { format } = require('date-fns');

    const [task, setTask] = useState({
        task: "",
        expiresAt: format(
            new Date(),
            'yyyy-MM-dd HH:mm:ss'
        ),
    });



    const handleSubmit = (event) => {
        event.preventDefault();
        addNewTask(task, id, token);
        navigate('/tasks/' + id);
        setTask({ task: "", expiresAt: "" });
    };

    return (
        <Paper>
            <h2>Create Task Form</h2>
            <TextField
                value={task.task}
                label={"Task"}
                onChange={e => setTask({ ...task, task: e.target.value })}
            />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="ExpiresAt"
                    value={task.expiresAt}
                    onChange={newValue => setTask({
                        ...task, expiresAt: format(
                            newValue,
                            'yyyy-MM-dd HH:mm:ss'
                        ), 
                    })}
                />
            </LocalizationProvider>
            <Typography />
            <Button onClick={handleSubmit}>Create Task</Button>
        </Paper>
    )
}


