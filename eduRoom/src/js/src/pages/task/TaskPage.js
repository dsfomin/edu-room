import React, { useEffect } from "react";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { submitTask, getTaskProgressByTaskAndUser } from '../../client';
import { useAuth } from "../../hook/useAuth";

function TaskPage() {
    const { taskId } = useParams();
    const { id, token } = useAuth();

    const [taskProgress, setTaskProgress] = useState({
        task: {
            id: "",
            task: "",
            createdAt: "",
            expiresAt: "",
        },
        lastUpdate: "",
    });
    
    useEffect(() => {
        getTaskProgressByTaskAndUser(taskId, id, token)
            .then(res => res.json())
            .then(data => setTaskProgress(data));
    }, [taskId, token])

    const submitTsk = () => {
        submitTask(taskId, id, token).catch(err => {
            console.log('Participate Course: Something went wrong', err);
        });
        window.location.reload(false);
    }

    return (
        <>
            <Typography>id: {taskProgress.task?.id}</Typography>
            <Typography>task: {taskProgress.task?.task}</Typography>
            <Typography>createdAt: {taskProgress.task?.createdAt}</Typography>
            <Typography>expiresAt: {taskProgress.task?.expiresAt}</Typography>
            <Typography>lastUpdate: {taskProgress.lastUpdate}</Typography>
            <Button
                key={"done"}
                onClick={submitTsk}
                variant="outlined"
                sx={{ my: 2 , color: 'black'}}
            >
                Done
            </Button>
        </>
    )
}

export default TaskPage;