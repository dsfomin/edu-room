package com.backend.eduroom.controller;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.User;
import com.backend.eduroom.model.UserRole;
import com.backend.eduroom.service.CourseRegistrationService;
import com.backend.eduroom.service.CourseService;
import com.backend.eduroom.service.UserService;
import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@AllArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/courses")
@Slf4j
public class CourseController {

    private final CourseService courseService;
    private final CourseRegistrationService courseRegistrationService;
    private final UserService userService;

    @GetMapping
    @JsonView(View.CourseView.IdName.class)
    public List<Course> getAllCourses() {
        return courseService.getAllCourses();
    }

    @GetMapping(path = "{courseId}")
    @JsonView(View.CourseView.Internal.class)
    public Course getCourse(@PathVariable("courseId") Long courseId) {
        return courseService.getCourse(courseId);
    }

    @Transactional
    @PostMapping
    @JsonView(View.CourseView.IdName.class)
    public void addNewCourse(@RequestBody Course course, @AuthenticationPrincipal User teacher) {
        User user = userService.getUser(teacher.getId());
        course.setCourseTeachers(Set.of(user));
        courseService.addNewCourse(course);
    }

    @PutMapping(path = "{courseId}")
    @JsonView(View.CourseView.IdName.class)
    public void updateCourse(@PathVariable("courseId") Long courseId,
                              @RequestBody Course course) {
        course.setId(courseId);
        courseService.addNewCourse(course);
    }

    @DeleteMapping("{courseId}")
    @JsonView(View.CourseView.IdName.class)
    public void deleteCourse(@PathVariable("courseId") Long courseId) {
        courseService.deleteCourse(courseId);
    }

    @PostMapping("{courseId}/participate")
    @JsonView(View.CourseView.IdName.class)
    public void participateCourse(@PathVariable("courseId") Course course,
                                  @AuthenticationPrincipal User user) {
        User userFromDb = userService.getUser(user.getId());
        courseRegistrationService.participate(course, userFromDb);
    }
}
