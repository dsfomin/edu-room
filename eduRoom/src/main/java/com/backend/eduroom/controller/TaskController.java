package com.backend.eduroom.controller;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.Task;
import com.backend.eduroom.model.User;
import com.backend.eduroom.service.CourseRegistrationService;
import com.backend.eduroom.service.CourseService;
import com.backend.eduroom.service.TaskService;
import com.backend.eduroom.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskService taskService;
    private final CourseRegistrationService courseRegistrationService;
    private final UserService userService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping(path = "{taskId}")
    public Task getTask(@PathVariable("taskId") Long taskId) {
        return taskService.getTask(taskId);
    }

    @Transactional
    @PostMapping
    public void addNewTask(@RequestBody Task task, @AuthenticationPrincipal User teacher) {
        User user = userService.getUser(teacher.getId());
        task.setCreatedAt(LocalDateTime.now());
        task.setTeacher(user);
        taskService.addNewTask(task);
    }

    @PutMapping(path = "{taskId}")
    public void updateTask(@PathVariable("taskId") Long taskId,
                              @RequestBody Task task) {
        task.setId(taskId);
        taskService.addNewTask(task);
    }

    @DeleteMapping("{taskId}")
    public void deleteTask(@PathVariable("taskId") Long taskId) {
        taskService.deleteTask(taskId);
    }
}
