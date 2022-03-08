package com.backend.eduroom.controller;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.service.CourseService;
import com.backend.eduroom.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseService courseService;
    private final UserService userService;

    @GetMapping
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping(path = "{courseId}")
    public Course getCourse(@PathVariable("courseId") Long courseId) {
        return courseService.getCourse(courseId);
    }

    @Transactional
    @PostMapping
    public void addNewCourse(@RequestBody Course course, @AuthenticationPrincipal User teacher) {
        User user = userService.getUser(teacher.getId());
        course.setCourseTeachers(Set.of(user));
        courseService.addNewCourse(course);
    }

    @PutMapping(path = "{courseId}")
    public void updateCourse(@PathVariable("courseId") Long courseId,
                              @RequestBody Course course) {
        course.setId(courseId);
        courseService.addNewCourse(course);
    }

    @DeleteMapping("{courseId}")
    public void deleteCourse(@PathVariable("courseId") Long courseId) {
        courseService.deleteCourse(courseId);
    }


}
