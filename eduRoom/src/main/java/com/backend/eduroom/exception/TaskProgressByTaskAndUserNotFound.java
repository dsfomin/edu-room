package com.backend.eduroom.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class TaskProgressByTaskAndUserNotFound extends RuntimeException {
    public TaskProgressByTaskAndUserNotFound(Long taskId, Long userId) {
        super("Task: " + taskId + " and User: " + userId + " wasn't found");
    }
}
