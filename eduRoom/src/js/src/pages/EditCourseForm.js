import React, { useEffect } from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { findCourse, updateCourse } from '../client';
import { useAuth } from "../hook/useAuth";


export default function EditCourseForm() {
    const navigate = useNavigate()
    const {id} = useParams()
    const {token} = useAuth();

    const [course, setCourse] = useState({
        name: "",
        description: "",
    })

    useEffect(() => {
        findCourse(id, token)
        .then(res => res.json())
        .then(data => setCourse(data))
    }, [id])

    const handleSubmit = (event) => {
        event.preventDefault()
        updateCourse(id, course, token);
        navigate('/courses')
        setCourse({ name: "", description: "",})
    };


    return (
        <>
            <Paper>
                <h2>Edit Course Form</h2>
                <TextField
                    value={course.name}
                    label={"Name"}
                    onChange={e => setCourse({ ...course, name: e.target.value })}
                />
                <TextField
                    value={course.description}
                    label={"Description"}
                    onChange={e => setCourse({ ...course, description: e.target.value })}
                />
                <Typography />
                <Button onClick={handleSubmit}>Update Course</Button>
            </Paper>
        </>
    )
}



