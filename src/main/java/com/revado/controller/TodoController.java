package com.revado.controller;


import com.revado.entity.Todo;
import com.revado.entity.User;
import com.revado.repository.TodoRepository;
import com.revado.repository.UserRepository;
//import org.springframework.boot.actuate.endpoint.SecurityContext;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users/{userId}/todos")
public class TodoController {

    private final TodoRepository todoRepository;
    private final UserRepository userRepository;

    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
        this.todoRepository = todoRepository;
        this.userRepository = userRepository;

    }

    public String Email() {
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Todo createTodo(@PathVariable Long userId, @RequestBody Todo todo) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));

        todo.setId(null);
        todo.setUser(user);    // associate with owner
        return todoRepository.save(todo);
    }

    @GetMapping
    public List<Todo> myTodos(@PathVariable Long userId) {

        return todoRepository.findByUserId(userId);
    }
    @PutMapping("/{todoId}")
    public Todo updateTodo(@PathVariable Long userId,@PathVariable Long todoId,
                           @RequestBody Todo coming){

        Todo todo = todoRepository.findByIdAndUserId(todoId,userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));
                 todo.setTitle(coming.getTitle());
                 todo.setDescription(coming.getDescription());
                 todo.setCompleted(coming.isCompleted());
             return todoRepository.save(todo);
    }
    @PatchMapping("/{todoId}/complete")
    public Todo toggleComplete(@PathVariable Long userId, @PathVariable Long todoId) {

        Todo todo = todoRepository.findByIdAndUserId(todoId, userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Todo not found"));

        todo.setCompleted(!todo.isCompleted());
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{todoid}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTodo(@PathVariable Long userId, @PathVariable Long todoId){
        Todo todo = todoRepository.findByIdAndUserId(todoId,userId)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"Todo Not found"));
        todoRepository.delete(todo);
    }

}