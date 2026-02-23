package com.revado.service;

import com.revado.entity.Subtask;
import com.revado.entity.Todo;
import com.revado.repository.SubtaskRepository;
import com.revado.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SubtaskService {

    private final TodoRepository todoRepository;
    private final SubtaskRepository subtaskRepository;

    private Todo getTodoForUser(Long userId, Long todoId) {
        return todoRepository.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
    }

    public Subtask create(Long userId, Long todoId, Subtask subtask) {
        Todo todo = getTodoForUser(userId, todoId);

        subtask.setId(null);
        subtask.setTodo(todo);
        return subtaskRepository.save(subtask);
    }
    public Subtask getById(Long userId, Long todoId, Long subtaskId) {
        return subtaskRepository.findByIdAndTodoIdAndTodoUserId(subtaskId, todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));
    }
    public List<Subtask> getAll(Long userId, Long todoId) {
        getTodoForUser(userId, todoId);
        return subtaskRepository.findByTodoId(todoId);
    }

    public Subtask update(Long userId, Long todoId, Long subtaskId, Subtask incoming) {
        getTodoForUser(userId, todoId);

        Subtask subtask = subtaskRepository.findByIdAndTodoId(subtaskId, todoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));

        subtask.setTitle(incoming.getTitle());
        subtask.setCompleted(incoming.isCompleted());
        return subtaskRepository.save(subtask);
    }

    public Subtask toggleComplete(Long userId, Long todoId, Long subtaskId) {
        getTodoForUser(userId, todoId);

        Subtask subtask = subtaskRepository.findByIdAndTodoId(subtaskId, todoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));

        subtask.setCompleted(!subtask.isCompleted());
        return subtaskRepository.save(subtask);
    }

    public void delete(Long userId, Long todoId, Long subtaskId) {
        getTodoForUser(userId, todoId);

        Subtask subtask = subtaskRepository.findByIdAndTodoId(subtaskId, todoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));

        subtaskRepository.delete(subtask);
    }
}
