package com.backend.eduroom.repository;

import com.backend.eduroom.model.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    @EntityGraph(attributePaths = {"enrolledUsers", "courseTeachers"})
    Page<Course> findAll(Pageable pageable);

    @EntityGraph(attributePaths = {"enrolledUsers", "courseTeachers"})
    Optional<Course> findById(Long id);
}
