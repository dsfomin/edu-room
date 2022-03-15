import React from "react";
import { useState } from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { addNewCourse } from "../client";
import { useAuth } from "../hook/useAuth";


export default function AddCourseForm() {
    const navigate = useNavigate();
    const {token} = useAuth();

    const [course, setCourse] = useState({
        name: "",
        description: "",
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        addNewCourse(course, token);
        navigate('/courses');
        setCourse({ name: "", description: ""});
    };

    return (
        <Paper>
            <h2>Create Course Form</h2>
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
            <Button onClick={handleSubmit}>Create Course</Button>
        </Paper>
    )
}


