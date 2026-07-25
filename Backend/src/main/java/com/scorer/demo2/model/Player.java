package com.scorer.demo2.model;

import java.time.LocalDate;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "players")
public class Player {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int num;
    private String name;
    @JsonFormat(pattern = "dd-MMM-yyyy")
    private LocalDate birthdate;
    private String natio;
    @ManyToOne
    @JoinColumn(name = "team_id")
    @JsonBackReference   
    private Team team;
    private String pos;
    @OneToMany(mappedBy = "player", fetch = FetchType.LAZY)
    @JsonManagedReference
    @JsonIgnore
    private Set<Goal> goals = new HashSet<>();
    @OneToMany(mappedBy = "player", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Penalty> penalties = new HashSet<>();    
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public int getNum() {
        return num;
    }
    public void setNum(int num) {
        this.num = num;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public LocalDate getBirthdate() {
        return birthdate;
    }
    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }
    public String getNatio() {
        return natio;
    }
    public void setNatio(String natio) {
        this.natio = natio;
    }
    public Team getTeam() {
        return team;
    }
    public void setTeam(Team team) {
        this.team = team;
    }
    public String getPos() {
        return pos;
    }
    public void setPos(String pos) {
        this.pos = pos;
    }
    public Set<Goal> getGoals() {
        return goals;
    }
    public void setGoals(Set<Goal> goals) {
        this.goals = goals;
    }
    public Set<Penalty> getPenalties() {
        return penalties;
    }
    public void setPenalties(Set<Penalty> penalties) {
        this.penalties = penalties;
    }

}
