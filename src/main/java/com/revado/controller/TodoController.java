package com.revado.controller;


//import com.revado.entity.Todo;
//import com.revado.entity.User;
//import com.revado.repository.TodoRepository;
//import com.revado.repository.UserRepository;
//import org.springframework.boot.actuate.endpoint.SecurityContext;
//import org.springframework.http.HttpStatus;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/todos")
public class TodoController {
//
//    private TodoRepository todoRepository;
//    private UserRepository userRepository;
//
//    public TodoController(TodoRepository todoRepository, UserRepository userRepository) {
//        this.todoRepository = todoRepository;
//        this.userRepository = userRepository;
//
//    }
//
//    public String Email() {
//        return SecurityContextHolder.getContext().getAuthentication().getName();
//    }
//
//    @GetMapping
//    public List<TodoRepository> myTodos() {
//        return todoRepository.findByUserEmail(Email())
//                .stream()
//                .map(t -> new TodoRepository(t.getId(), t.getTitle(), t.getDescription(), t.isCompleted()))
//                .toList();
//    }
//
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public TodoRepository create(@RequestBody TodoRepository req){
//        User user = userRepository.findByEmail(Email()).orElseThrow(()=>{})
//    }
}