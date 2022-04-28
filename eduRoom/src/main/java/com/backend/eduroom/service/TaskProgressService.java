package com.backend.eduroom.service;

import com.backend.eduroom.exception.TaskProgressByTaskAndUserNotFound;
import com.backend.eduroom.model.*;
import com.backend.eduroom.repository.CourseRegistrationRepository;
import com.backend.eduroom.repository.TaskProgressRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@AllArgsConstructor
@Slf4j
public class TaskProgressService {

    private final TaskProgressRepository taskProgressRepository;
    private final CourseRegistrationRepository courseRegistrationRepository;

    @Transactional
    public void submitTask(Task task, User user) {
        Optional<TaskProgress> taskProgress = taskProgressRepository.findByTaskAndUser(task, user);

        taskProgressRepository.save(TaskProgress.builder()
                .id(taskProgress.map(TaskProgress::getId).orElse(null))
                .task(task)
                .user(user)
                .isDone(true)
                .lastUpdate(LocalDateTime.now())
                .build());
    }

    public TaskProgress getTaskProgressByTaskAndUser(Task task, User user) {
        Optional<TaskProgress> byTaskAndUser = taskProgressRepository.findByTaskAndUser(task, user);

        return TaskProgress.builder()
                .id(byTaskAndUser.map(TaskProgress::getId).orElse(null))
                .lastUpdate(byTaskAndUser.map(TaskProgress::getLastUpdate).orElse(null))
                .task(byTaskAndUser.map(TaskProgress::getTask).orElse(task))
                .isDone(byTaskAndUser.map(TaskProgress::getIsDone).orElse(null))
                .user(byTaskAndUser.map(TaskProgress::getUser).orElse(null))
                .build();
    }

    @Transactional
    public List<TaskProgress> getAllTaskProgressesByUser(User user) {
        List<TaskProgress> allTaskProgressesByUser = taskProgressRepository.findAllByUser(user);
        List<CourseRegistration> allCourseRegistrationsByUser = courseRegistrationRepository.findAllByUser(user);

        List<TaskProgress> allNotDoneTaskProgressesByUser = allCourseRegistrationsByUser
                .stream()
                .map(CourseRegistration::getCourse)
                .map(Course::getTasks)
                .flatMap(Set::stream)
                .filter(task -> !(allTaskProgressesByUser.stream()
                        .map(TaskProgress::getTask)
                        .collect(Collectors.toList())
                        .contains(task)))
                .map(task -> TaskProgress.builder()
                        .task(task)
                        .user(user)
                        .isDone(false)
                        .lastUpdate(LocalDateTime.MIN)
                        .build())
                .collect(Collectors.toList());

        return Stream.concat(
                        allNotDoneTaskProgressesByUser.stream(),
                        allTaskProgressesByUser.stream())
                .collect(Collectors.toList());
    }
}
