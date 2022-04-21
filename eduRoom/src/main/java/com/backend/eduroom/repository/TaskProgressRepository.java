package com.backend.eduroom.repository;

import com.backend.eduroom.model.Task;
import com.backend.eduroom.model.TaskProgress;
import com.backend.eduroom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TaskProgressRepository extends JpaRepository<TaskProgress, Long> {
    Optional<TaskProgress> findByTaskAndUser(Task task, User user);
    List<TaskProgress> findAllByUser(User user);
}
