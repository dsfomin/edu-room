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
import { Link } from "react-router-dom";
import { deleteCourse, getAllCourses } from '../client';
import { useAuth } from '../hook/useAuth';

export default function CourseTable() {
  const { token } = useAuth();
  const [courses, setCourses] = useState([])

  useEffect(() => {
    getAllCourses(token)
      .then(res => res.json()
        .then(data => setCourses([...data])))
      .catch(error => {
        console.log(error);
      });
  }, [])

  const delCourse = (courseId) => {
    deleteCourse(courseId, token).catch(err => {
      console.log('Delete Course: Something went wrong', err);
    });
  }

  return (
    <>
      <Link
        style={{ textDecoration: "none" }}
        to={"/add-new-course"}
      >
        <Button sx={{ mt: 2 }} variant="outlined" startIcon={<AddCircleOutlineIcon />}>
          Add Course
        </Button>
      </Link>

      <TableContainer component={Paper} sx={{ width: 1, mt: 1 }}>
        {(courses && courses.length)
          ? <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell />
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.map((course) => (
                <TableRow
                  key={course.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell scope="course">{course.id}</TableCell>
                  <TableCell>{course.name}</TableCell>
                  <TableCell>
                    <Button onClick={() => delCourse(course.id)} variant="outlined" startIcon={<DeleteIcon />}>Delete Course</Button>
                  </TableCell>
                  <TableCell>
                    <Link
                      style={{ textDecoration: "none" }}
                      to={`/edit-course/${course.id}`}
                    >
                      <Button variant="outlined" startIcon={<ModeEditIcon />}>Edit Course</Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                  <Link
                      style={{ textDecoration: "none" }}
                      to={`/course-page/${course.id}`}
                    >
                      <Button variant="outlined" startIcon={<ModeEditIcon />}>Course Page</Button>
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