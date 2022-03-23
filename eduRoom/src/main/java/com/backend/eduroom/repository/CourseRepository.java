package com.backend.eduroom.repository;

import com.backend.eduroom.model.Course;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @EntityGraph(attributePaths = { "tasks", "enrolledUsers", "courseTeachers.authorities" })
    List<Course> findAll();
}
