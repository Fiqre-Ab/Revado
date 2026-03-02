package com.revado.controller;

import com.revado.entity.Todo;
import com.revado.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/todos")
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo create(@PathVariable Long userId, @RequestBody Todo todo) {
        return todoService.create(userId, todo);
    }
    @GetMapping
    public List<Todo> getAll(@PathVariable Long userId) {
        return todoService.getByUser(userId);
    }
    @GetMapping("/{todoId}")
    public Todo getById(@PathVariable Long userId, @PathVariable Long todoId) {
        return todoService.getById(userId, todoId);
    }
    @PutMapping("/{todoId}")
    public Todo update(@PathVariable Long userId, @PathVariable Long todoId, @RequestBody Todo incoming) {
        return todoService.update(userId, todoId, incoming);
    }

    @PatchMapping("/{todoId}/complete")
    public Todo toggle(@PathVariable Long userId, @PathVariable Long todoId) {
        return todoService.toggleComplete(userId, todoId);
    }

    @DeleteMapping("/{todoId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long userId, @PathVariable Long todoId) {
        todoService.delete(userId, todoId);
    }
}