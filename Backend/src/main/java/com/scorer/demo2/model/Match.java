package com.scorer.demo2.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
@Table(name = "matches")
public class Match {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "home_id")
    @JsonIgnoreProperties({"players"})
    private Team homeTeam;
    @ManyToOne
    @JoinColumn(name = "away_id")
    @JsonIgnoreProperties({"players"})
    private Team awayTeam;
    @JsonFormat(pattern = "dd-MMM-yyyy")
    private LocalDate match_date;
    private int match_status;
    private int match_round;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime match_time;
    @OneToMany(mappedBy = "match", fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Goal> goals = new HashSet<>();
    @OneToMany(mappedBy = "match", fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Penalty> penalties = new HashSet<>();    
    public Set<Penalty> getPenalties() {
        return penalties;
    }
    public void setPenalties(Set<Penalty> penalties) {
        this.penalties = penalties;
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public LocalDate getMatch_date() {
        return match_date;
    }
    public void setMatch_date(LocalDate match_date) {
        this.match_date = match_date;
    }
    public int getMatch_status() {
        return match_status;
    }
    public void setMatch_status(int match_status) {
        this.match_status = match_status;
    }
    public int getMatch_round() {
        return match_round;
    }
    public void setMatch_round(int match_round) {
        this.match_round = match_round;
    }
    public LocalTime getMatch_time() {
        return match_time;
    }
    public void setMatch_time(LocalTime match_time) {
        this.match_time = match_time;
    }
    public Team getHomeTeam() {
        return homeTeam;
    }
    public void setHomeTeam(Team homeTeam) {
        this.homeTeam = homeTeam;
    }
    public Team getAwayTeam() {
        return awayTeam;
    }
    public void setAwayTeam(Team awayTeam) {
        this.awayTeam = awayTeam;
    }
    public Set<Goal> getGoals() {
        return goals;
    }
    public void setGoals(Set<Goal> goals) {
        this.goals = goals;
    }
}
