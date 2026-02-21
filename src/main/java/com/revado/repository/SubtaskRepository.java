package com.revado.repository;

import com.revado.entity.Subtask;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SubtaskRepository extends JpaRepository<Subtask,Long> {
    List<Subtask> findByTodoId(Long todoId);
    Optional<Subtask> findByIdAndTodoId(Long id, Long todoId);
}
