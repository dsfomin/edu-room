package com.backend.eduroom.model;

import com.backend.eduroom.util.EntityIdResolver;
import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@JsonIdentityInfo(scope = TaskProgress.class, property = "id",
        resolver = EntityIdResolver.class,
        generator = ObjectIdGenerators.PropertyGenerator.class)
public class TaskProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    private User user;

    @ManyToOne
    @JoinColumn(name = "task_id", nullable = false)
    @JsonIdentityReference(alwaysAsId = true)
    private Task task;

    private Boolean isDone;
}
