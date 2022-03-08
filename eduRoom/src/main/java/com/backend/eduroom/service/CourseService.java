package com.backend.eduroom.service;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.User;
import com.backend.eduroom.repository.CourseRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class CourseService {
    private final CourseRepository courseRepository;

    public Course addNewCourse(Course course) {
        return courseRepository.save(course);
    }

    public Course getCourse(Long courseId) {
        return courseRepository.findById(courseId).orElseThrow(() -> {
            throw new IllegalArgumentException("Course with id " + courseId + " not found");
        });
    }

    public void deleteCourse(Long courseId) {
        courseRepository.deleteById(courseId);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
