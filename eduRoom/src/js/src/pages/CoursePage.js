import React, { useEffect } from "react";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams } from 'react-router-dom';
import { findCourse, participate } from '../client';
import { useAuth } from "../hook/useAuth";

function CoursePage() {
    const { id } = useParams()
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
        </>
    )
}

export default CoursePage;