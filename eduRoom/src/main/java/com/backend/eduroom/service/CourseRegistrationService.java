package com.backend.eduroom.service;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.CourseRegistration;
import com.backend.eduroom.model.User;
import com.backend.eduroom.repository.CourseRegistrationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class CourseRegistrationService {
    private final CourseRegistrationRepository courseRegistrationRepository;

    public void participate(Course course, User user) {
        if (courseRegistrationRepository.findByUserAndCourse(user, course).isPresent()) {
            return;
        }

        CourseRegistration registration = CourseRegistration.builder()
                .user(user)
                .course(course)
                .registeredAt(LocalDateTime.now())
                .isEnrolled(true)
                .build();

        courseRegistrationRepository.save(registration);
    }
}
