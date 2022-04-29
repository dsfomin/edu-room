import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Button, Pagination, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Empty } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { deleteCourse } from '../../client';
import { useAuth } from '../../hook/useAuth';
import CourseService from '../../services/course.service';

export default function CourseTable() {
  const { token } = useAuth();
  const [courses, setCourses] = useState({
    content: [],
    pageNo: 0,
    pageSize: 2,
    order: "asc",
    sortBy: "id",
    totalElements: "",
    totalPages: "",
  })

  const navigate = useNavigate();

  useEffect(() => {
    CourseService.getAll(token, new URLSearchParams({
      "pageNo": courses.pageNo,
      "pageSize": courses.pageSize,
      "order": courses.order,
      "sortBy": courses.sortBy
    }))
      .then(res => setCourses(res.data))
      .catch((e) => {
        console.log(e);
      });
  }, [navigate, token, courses.pageNo, courses.pageSize, courses.order, courses.sortBy])

  const delCourse = (courseId) => {
    deleteCourse(courseId, token).catch(err => {
      console.log('Delete Course: Something went wrong', err);
    });
    window.location.reload(false);
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
        {(courses.content && courses.content.length) ?
          <>
           <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell onClick={() => setCourses({ ...courses, sortBy: "id" })}>ID</TableCell>
                <TableCell onClick={() => setCourses({ ...courses, sortBy: "name" })}>Name</TableCell>
                <TableCell>Delete</TableCell>
                <TableCell>Update</TableCell>
                <TableCell>Look-up</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courses.content.map((course) => (
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
            <Pagination
              page={courses.pageNo + 1}
              count={courses.totalPages}
              onChange={(event, value) => setCourses({ ...courses, pageNo: value - 1 })}
            />
          </>
          : <Empty description={
            <Typography component={'span'} variant={'body2'}>No Courses found</Typography>
          } />
        }
      </TableContainer>
    </>
  );
}