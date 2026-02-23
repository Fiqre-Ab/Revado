package com.revado.controller;

import com.revado.entity.Subtask;
import com.revado.service.SubtaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/todos/{todoId}/subtasks")
@RequiredArgsConstructor
public class SubTaskController {
    private final SubtaskService subtaskService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Subtask create(@PathVariable Long userId, @PathVariable Long todoId, @RequestBody Subtask subtask) {
        return subtaskService.create(userId, todoId, subtask);
    }

    @GetMapping
    public List<Subtask> getAll(@PathVariable Long userId, @PathVariable Long todoId) {
        return subtaskService.getAll(userId, todoId);
    }
    @GetMapping("/{subtaskId}")
    public Subtask getById(@PathVariable Long userId,
                           @PathVariable Long todoId,
                           @PathVariable Long subtaskId) {
        return subtaskService.getById(userId, todoId, subtaskId);
    }
    @PutMapping("/{subtaskId}")
    public Subtask update(@PathVariable Long userId, @PathVariable Long todoId,
                          @PathVariable Long subtaskId, @RequestBody Subtask incoming) {
        return subtaskService.update(userId, todoId, subtaskId, incoming);
    }

    @PatchMapping("/{subtaskId}/complete")
    public Subtask toggle(@PathVariable Long userId, @PathVariable Long todoId, @PathVariable Long subtaskId) {
        return subtaskService.toggleComplete(userId, todoId, subtaskId);
    }

    @DeleteMapping("/{subtaskId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long userId, @PathVariable Long todoId, @PathVariable Long subtaskId) {
        subtaskService.delete(userId, todoId, subtaskId);
    }
}