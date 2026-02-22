package com.revado.controller;

import com.revado.entity.Subtask;
import com.revado.entity.Todo;
import com.revado.repository.SubtaskRepository;
import com.revado.repository.TodoRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/todos/{todoId}/subtasks")
public class SubTaskController {

    private final TodoRepository todoRepo;
    private final SubtaskRepository subtaskRepo;

    public SubTaskController(TodoRepository todoRepo, SubtaskRepository subtaskRepo) {
        this.todoRepo = todoRepo;
        this.subtaskRepo = subtaskRepo;
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Subtask createSubtask(@PathVariable Long userId,
                                 @PathVariable Long todoId,
                                 @RequestBody Subtask subtask) {

        Todo todo = todoRepo.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        subtask.setId(null);
        subtask.setTodo(todo);
        return subtaskRepo.save(subtask);
    }
    @GetMapping
    public List<Subtask> getSubtasks(@PathVariable Long userId,
                                     @PathVariable Long todoId) {
        todoRepo.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        return subtaskRepo.findByTodoId(todoId);
    }
    @PutMapping("/{subtaskId}")
    public Subtask updateSubtask(@PathVariable Long userId,
                                 @PathVariable Long todoId,
                                 @PathVariable Long subtaskId,
                                 @RequestBody Subtask incoming) {

        todoRepo.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        Subtask subtask = subtaskRepo.findByIdAndTodoId(subtaskId, todoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));

        subtask.setTitle(incoming.getTitle());
        subtask.setCompleted(incoming.isCompleted());

        return subtaskRepo.save(subtask);
    }

    @PatchMapping("/{subtaskId}/complete")
    public Subtask toggleSubtaskComplete(@PathVariable Long userId,
                                         @PathVariable Long todoId,
                                         @PathVariable Long subtaskId) {

        todoRepo.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        Subtask subtask = subtaskRepo.findByIdAndTodoId(subtaskId, todoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));

        subtask.setCompleted(!subtask.isCompleted());
        return subtaskRepo.save(subtask);
    }

    @DeleteMapping("/{subtaskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteSubtask(@PathVariable Long userId,
                              @PathVariable Long todoId,
                              @PathVariable Long subtaskId) {

        todoRepo.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        Subtask subtask = subtaskRepo.findByIdAndTodoId(subtaskId, todoId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Subtask not found"));

        subtaskRepo.delete(subtask);
    }
}