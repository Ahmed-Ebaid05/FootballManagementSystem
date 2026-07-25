package com.scorer.demo2.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.scorer.demo2.model.User;
import com.scorer.demo2.service.UserService;

@RestController
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping("/currentUser")
    public Map<String, Object> currentUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || auth.getName().equals("anonymousUser")) {
            return null;
        }

        List<String> roles = auth.getAuthorities()
            .stream()
            .map(a -> a.getAuthority())
            .collect(Collectors.toList());

        User user = userService.getUserByEmail(auth.getName());

        Map<String, Object> data = new HashMap<>();
        data.put("email", user.getEmail());
        data.put("username", user.getUsername());
        data.put("roles", roles);
        data.put("birthdate", user.getBirthdate());
        data.put("firstName", user.getFirst_name());
        data.put("lastName", user.getLast_name());

        if (user.getProfile_pic() != null) 
            data.put("pic", Base64.getEncoder().encodeToString(user.getProfile_pic()));
        else 
            data.put("pic", null);
        return data;
    }

    @PostMapping("/editUser")
    public ResponseEntity<?> editUser (
        @RequestParam("firstName") String firstName,
        @RequestParam("lastName") String lastName,
        @RequestParam("username") String username,
        @RequestParam("email") String email,
        @RequestParam("birthdate") LocalDate birthdate
    ) {
        try {
            return ResponseEntity.ok(userService.editUser(firstName, lastName, username, email, birthdate));
        } catch (DataIntegrityViolationException e) {
            String msg = e.getMostSpecificCause().getMessage();
            System.out.println("DB ERROR: " + msg);

            if (msg.contains("users.username")) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
                } else {
                    return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Duplicate field exists");
                }
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong");
        }
    }

    @PutMapping("/addUser")
    public ResponseEntity<?> addUser(
            @RequestParam("firstName") String firstName,
            @RequestParam("lastName") String lastName,
            @RequestParam("username") String username,
            @RequestParam("email") String email,
            @RequestParam("password") String password,
            @RequestParam("birthdate") LocalDate birthdate,
            @RequestParam(required = false) MultipartFile pic
    ) {
        try {

            byte[] picBytes = null;
            if (pic != null && !pic.isEmpty()) {
                picBytes = pic.getBytes();
            } else {
                picBytes = Files.readAllBytes(Path.of(
                    "C:\\Users\\Lenovo\\Desktop\\demo2\\src\\main\\resources\\static\\images\\images.png"
                ));            
            }
            return ResponseEntity.ok(userService.addUser(firstName, lastName, username, email, password, birthdate, picBytes));
        } catch (DataIntegrityViolationException e) {
            String msg = e.getMostSpecificCause().getMessage();
            System.out.println("DB ERROR: " + msg);

            if (msg.contains("users.email")) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Email already exists");
            } else if (msg.contains("users.username")) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
            } else {
                    return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Duplicate field exists");
            }
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong");
        }
    }

    @PostMapping("/changeProfilePic")
    public ResponseEntity<?> chanegPofilePic (
        @RequestParam("email") String email,
        @RequestParam(required = false) MultipartFile pic
    ) {

        try {
            byte[] picBytes = null;
            if (pic != null && !pic.isEmpty()) {
                picBytes = pic.getBytes();
            } else {
                picBytes = Files.readAllBytes(Path.of(
                    "C:\\Users\\Lenovo\\Desktop\\demo2\\src\\main\\resources\\static\\images\\images.png"
                ));            
            }
            return ResponseEntity.ok(userService.changeProfilePic(email, picBytes));
        } catch (DataIntegrityViolationException e) {
            String msg = e.getMostSpecificCause().getMessage();
            System.out.println("DB ERROR: " + msg);

            if (msg.contains("users.username")) {
                return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Username already exists");
                } else {
                    return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Duplicate field exists");
                }
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Something went wrong");
        }
    }

    @DeleteMapping("/deleteAccount/{email}/{password}")
    public boolean deleteAccount (
        @PathVariable("email") String email,
        @PathVariable("password") String password
    ) {
        return userService.deleteAccouont(email, password);
    }

}