import React, { useEffect } from "react";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import { Link, useParams } from 'react-router-dom';
import { findCourse, participate } from '../../client';
import { useAuth } from "../../hook/useAuth";
import ListAltIcon from '@mui/icons-material/ListAlt';

function CoursePage() {
    const { id } = useParams();
    const { token } = useAuth();

    const [course, setCourse] = useState({
        id: "",
        name: "",
        description: "",
        courseTeachers: [],
        enrolledUsers: [],
    });

    useEffect(() => {
        findCourse(id, token)
            .then(res => res.json())
            .then(data => setCourse(data))
    }, [id, token])


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
            <Typography>users: {course.enrolledUsers.map(registration => registration.user.email).join(", ")}</Typography>
            <Typography>teacher: {course.courseTeachers.map(teacher => teacher.name).join(", ")}</Typography>
            <Button
                key={"participate"}
                onClick={participateOnCourse}
                variant="outlined"
                sx={{ my: 2 , color: 'black'}}
            >
                Participate
            </Button>
            <Link
                style={{ textDecoration: "none" }}
                to={"/tasks/" + course.id}
            >
                <Button
                    sx={{ my: 1, color: 'black' }}
                    variant="outlined"
                    startIcon={<ListAltIcon/>}>
                    Course Tasks
                </Button>
            </Link>
        </>
    )
}

export default CoursePage;