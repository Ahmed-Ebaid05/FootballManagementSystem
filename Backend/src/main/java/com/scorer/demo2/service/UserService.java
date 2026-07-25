package com.scorer.demo2.service;

import com.scorer.demo2.repos.UserRepos;
import com.scorer.demo2.model.Role;
import com.scorer.demo2.model.User;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    UserRepos userRepos;

    @Autowired
    RoleService roleService;

    @Autowired
    PasswordEncoder passwordEncoder;

    public UserDetails loadUserByUsername (String email) throws UsernameNotFoundException {
        User user = userRepos.getUserByEmail(email);
        if ( user == null) 
            throw new UsernameNotFoundException("User not found " + email);
        return new org.springframework.security.core.userdetails.User (user.getEmail(), user.getPassword(), user.getRoles());
    }

    public User getUserByEmail (String email) {
        return userRepos.getUserByEmail(email);
    }

    public User editUser (String firstName, String lastName, String username, String email, LocalDate birthdate) {
        User user = userRepos.getUserByEmail(email);
        user.setFirst_name(firstName);
        user.setLast_name(lastName);
        user.setUsername(username);
        user.setBirthdate(birthdate);
        userRepos.save(user);
        return user;
    }

    public User addUser (String firstName, String lastName, String username, String email, String password, LocalDate birthdate, byte[] pic) {
        User user = new User();
        Role role =  roleService.getRole(2L);
        user.setFirst_name(firstName);
        user.setLast_name(lastName);
        user.setUsername(username);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setBirthdate(birthdate);
        user.setProfile_pic(pic);
        user.setRoles(Set.of(role));
        userRepos.save(user);
        return user;
    }

    public User changeProfilePic (String email, byte[] pic) {
        User user = userRepos.getUserByEmail(email);
        user.setProfile_pic(pic);
        userRepos.save(user);
        return user;
    }

    public boolean deleteAccouont (String email, String password) {
        User user = userRepos.getUserByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            userRepos.delete(user);
            return true;
        }
        else
            return false;
    }

}