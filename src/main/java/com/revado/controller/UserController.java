package com.revado.controller;
import com.revado.entity.User;
import com.revado.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;
    public UserController(UserRepository userRepository){
        this.userRepository=userRepository;

    }

    /*Create user */
@PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User CreateUser(@RequestBody User user ){
        if(userRepository.existsByEmail(user.getEmail())){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Email is already Exists");
        }
        return userRepository.save(user);

}

/*Get all users*/
@GetMapping
public List<User> getAllUsers(){
    return userRepository.findAll();
}

/*Get user by id*/
@GetMapping("/{id}")
    public User getUser(@PathVariable Long id){
        return userRepository.findById(id).
                orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND,"user not found"));
}

/*Delete user by id*/
@DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"user not found");
        }
        userRepository.deleteById(id);
  }
}
