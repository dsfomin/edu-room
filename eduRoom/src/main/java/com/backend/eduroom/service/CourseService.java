package com.backend.eduroom.service;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.CourseRegistration;
import com.backend.eduroom.model.PageResponse;
import com.backend.eduroom.model.User;
import com.backend.eduroom.repository.CourseRepository;
import com.backend.eduroom.util.Pagination;
import com.backend.eduroom.util.PaginationRequestParams;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Service
@AllArgsConstructor
@Slf4j
public class CourseService {

    private final CourseRepository courseRepository;
    private final Pagination<Course> coursePagination;

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

    public PageResponse<Course> getAllCourses(Integer pageNo, Integer pageSize, String sortBy, String order) {
        return coursePagination.createPageResponse(courseRepository,
                new PaginationRequestParams(pageNo, pageSize, sortBy, order));
    }
}
