package com.scorer.demo2.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scorer.demo2.model.Role;
import com.scorer.demo2.repos.RoleRepos;

@Service
public class RoleService {

    @Autowired
    RoleRepos roleRepos;

    public Role getRole (Long id) {
        return roleRepos.findById(id).orElse(null);
    }

}
