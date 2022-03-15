package com.backend.eduroom.repository;

import com.backend.eduroom.model.Course;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
//    @EntityGraph(attributePaths = { "enrolledUsers" })
//    Optional<Course> findById(Long id);
//
//    @EntityGraph(attributePaths = { "enrolledUsers" })
//    List<Course> findAll();
}
