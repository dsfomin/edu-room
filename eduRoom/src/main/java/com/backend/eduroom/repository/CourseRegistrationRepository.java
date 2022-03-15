package com.backend.eduroom.repository;

import com.backend.eduroom.model.Course;
import com.backend.eduroom.model.CourseRegistration;
import com.backend.eduroom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRegistrationRepository extends JpaRepository<CourseRegistration, Long> {

    Optional<CourseRegistration> findByUserAndCourse(User user, Course course);

}
