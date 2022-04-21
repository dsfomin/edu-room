package com.backend.eduroom.service;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.Task;
import com.backend.eduroom.model.User;
import com.backend.eduroom.repository.CourseRepository;
import com.backend.eduroom.repository.TaskRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class TaskService {
    private final TaskRepository taskRepository;

    public Task addNewTask(Task task) {
        task.setCreatedAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    public Task getTask(Long taskId) {
        return taskRepository.findById(taskId).orElseThrow(() -> {
            throw new IllegalArgumentException("Course with id " + taskId + " not found");
        });
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getAllTasksByCourse(Course course) {
        return taskRepository.findAllByCourse(course);
    }
}
