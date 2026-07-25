package com.scorer.demo2.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Role;

@Repository
public interface RoleRepos extends JpaRepository <Role, Long>{
    
}
