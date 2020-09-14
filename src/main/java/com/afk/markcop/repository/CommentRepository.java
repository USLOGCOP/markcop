package com.afk.markcop.repository;

import com.afk.markcop.domain.Comment;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Comment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select comment from Comment comment where comment.login.login = ?#{principal.username}")
    List<Comment> findByLoginIsCurrentUser();
}
