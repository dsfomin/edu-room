import React, { useEffect } from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { findTask, updateTask } from '../../client';
import { useAuth } from "../../hook/useAuth";


export default function EditTaskForm() {
    const navigate = useNavigate()
    const {id, courseId} = useParams()
    const {token} = useAuth()

    const [task, setTask] = useState({
        task: "",
    })

    useEffect(() => {
        findTask(id, token)
        .then(res => res.json())
        .then(data => setTask(data))
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        updateTask(id, task, token)
        navigate('/tasks/' + courseId)
        setTask({ task: "",})
    };


    return (
        <>
            <Paper>
                <h2>Edit Task Form</h2>
                <TextField
                    value={task.task}
                    label={"Task"}
                    onChange={e => setTask({ ...task, task: e.target.value })}
                />
                <Typography />
                <Button onClick={handleSubmit}>Update Task</Button>
            </Paper>
        </>
    )
}



