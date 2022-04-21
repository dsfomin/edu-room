package com.backend.eduroom.repository;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.Task;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @EntityGraph(attributePaths = {"taskProgresses"})
    List<Task> findAll();

    @EntityGraph(attributePaths = {"taskProgresses"})
    List<Task> findAllByCourse(Course course);
}
