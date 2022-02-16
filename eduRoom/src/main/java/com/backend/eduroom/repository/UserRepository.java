package com.backend.eduroom.repository;

import com.backend.eduroom.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    @Modifying
    @Query("update User u set u.isActive=1 where u.id=?1")
    @Transactional
    void unblockUser(Long id);

    @Modifying
    @Query("update User u set u.isActive=0 where u.id=?1")
    @Transactional
    void blockUser(Long id);

//    Optional<User> findByEmail(String email);
}
