package com.backend.eduroom.controller;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.Task;
import com.backend.eduroom.model.TaskProgress;
import com.backend.eduroom.model.User;
import com.backend.eduroom.service.*;
import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tasks")
public class TaskController {

    private final static Logger LOGGER = LoggerFactory.getLogger(TaskController.class);

    private final TaskService taskService;
    private final CourseRegistrationService courseRegistrationService;
    private final UserService userService;
    private final TaskProgressService taskProgressService;

    @GetMapping
    @JsonView({View.TaskView.IdTask.class})
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    @GetMapping(path = "/course/{courseId}")
    @JsonView({View.TaskView.Internal.class})
    public List<Task> getAllTasksByCourse(@PathVariable("courseId") Course course) {
        return taskService.getAllTasksByCourse(course);
    }

    @GetMapping(path = "{taskId}")
    @JsonView({View.TaskView.External.class})
    public Task getTask(@PathVariable("taskId") Long taskId) {
        return taskService.getTask(taskId);
    }

    @GetMapping(path = "/task-page/{taskId}/{userId}")
    @JsonView({View.TaskView.External.class})
    public TaskProgress getTaskProgress(@PathVariable("taskId") Task task,
                                        @PathVariable("userId") User user) {
        return taskProgressService.getTaskProgressByTaskAndUser(task, user);
    }

    @PostMapping("/{courseId}")
    @JsonView({View.TaskView.External.class})
    public void addNewTask(@PathVariable("courseId") Course course,
                           @RequestBody Task task,
                           @AuthenticationPrincipal User teacher) {
        task.setTeacher(teacher);
        task.setCourse(course);
        taskService.addNewTask(task);
    }

    @PutMapping(path = "{taskId}")
    @JsonView({View.TaskView.External.class})
    public void updateTask(@PathVariable("taskId") Long taskId, @RequestBody Task task) {
        task.setId(taskId);
        taskService.addNewTask(task);
    }

    @DeleteMapping("{taskId}")
    @JsonView({View.TaskView.IdTask.class})
    public void deleteTask(@PathVariable("taskId") Long taskId) {
        taskService.deleteTask(taskId);
    }

    @GetMapping("/submit/{taskId}/{userId}")
    @JsonView({View.TaskView.Internal.class})
    public void submitTask(@PathVariable("taskId") Task task,
                         @PathVariable("userId") User user) {
        taskProgressService.submitTask(task, user);
    }

    @GetMapping("/my-tasks/{userId}")
    @JsonView({View.TaskView.External.class})
    public List<TaskProgress> getAllMyTasks(@PathVariable("userId") User user) {
        return taskProgressService.getAllTaskProgressesByUser(user);
    }
}
