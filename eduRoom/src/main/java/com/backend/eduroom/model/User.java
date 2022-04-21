package com.backend.eduroom.model;

import com.backend.eduroom.util.View;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = {"id"})
@Table(
        name = "usr",
        uniqueConstraints = {@UniqueConstraint(columnNames = {"email"})}
)
public class User implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({View.UserView.IdMail.class,
            View.CourseView.Internal.class,
            View.TaskView.External.class})
    private Long id;

    @JsonView({View.UserView.IdMail.class, View.CourseView.Internal.class})
    @Column(name = "email", unique = true)
    private String email;

    @JsonView(View.UserView.Login.class)
    private String password;

    @JsonView({View.UserView.Internal.class, View.CourseView.Internal.class})
    private String name;

    @JsonView({View.UserView.Internal.class, View.CourseView.Internal.class})
    private String surname;

    @JsonView(View.UserView.Internal.class)
    private Boolean isActive;

    @JsonView({View.UserView.Internal.class, View.UserView.Login.class})
    @ElementCollection(targetClass = UserRole.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "user_role", joinColumns = @JoinColumn(name = "user_id"))
    @Enumerated(EnumType.STRING)
    private Set<UserRole> authorities = new HashSet<>();

    @JsonView(View.UserView.Courses.class)
    @OneToMany(mappedBy = "user", orphanRemoval = true)
    private Set<CourseRegistration> chosenCourses = new HashSet<>();

    @JsonView(View.UserView.Tasks.class)
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "task", orphanRemoval = true)
    private Set<TaskProgress> userTasks = new HashSet<>();

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    public void setUsername(String username) {
        email = username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.isActive;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.isActive;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.isActive;
    }

    @Override
    public boolean isEnabled() {
        return this.isActive;
    }

    @Override
    public String toString() {
        return "User: [" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", authorities=" + authorities +
                ", isActive=" + isActive +
                ']';
    }
}
