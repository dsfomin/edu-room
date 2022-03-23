import React, { useEffect } from "react";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import { findCourse, participate } from '../client';
import { useAuth } from "../hook/useAuth";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function CoursePage() {
    const { id } = useParams();
    const { token } = useAuth();

    const [course, setCourse] = useState({
        id: "",
        name: "",
        description: "",
        courseTeachers: [],
        enrolledUsers: []
    });

    useEffect(() => {
        findCourse(id, token)
            .then(res => res.json())
            .then(data => setCourse(data))
    }, [id])


    const participateOnCourse = () => {
        participate(id, token).catch(err => {
            console.log('Participate Course: Something went wrong', err);
        });
    }

    return (
        <>
            <Typography>id: {course.id}</Typography>
            <Typography>name: {course.name}</Typography>
            <Typography>description: {course.description}</Typography>
            <Typography>users: {course.enrolledUsers.map(user => {
                return <li key={user.user.id}>{user.user.email}</li>;
            })}</Typography>
            <Typography>teacher: {course.courseTeachers.map(teacher => teacher.name)}</Typography>
            <Button
                key={"participate"}
                onClick={participateOnCourse}
                sx={{ my: 2, color: 'green', display: 'block' }}
            >
                Participate
            </Button>
            <Link
                style={{ textDecoration: "none" }}
                to={"/add-new-task/" + course.id}
            >
                <Button
                    sx={{ my: 2, color: 'green', display: 'block' }}
                    variant="outlined"
                    startIcon={<AddCircleOutlineIcon />}>
                    Add Task
                </Button>
            </Link>
        </>
    )
}

export default CoursePage;