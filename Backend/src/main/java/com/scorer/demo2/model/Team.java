package com.scorer.demo2.model;

import java.util.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "teams")
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String stadium;
    private String coach;
    private String foundation_year;
    private String slogan;
    private int ranking;
    private int in_league;
    private byte[] logo;
    private int points;
    private int wins;
    private int ties;
    private int loses;
    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    @JsonManagedReference
    private Set<Player> players = new HashSet<>();
    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    @JsonIgnore
    private Set<Goal> goals = new HashSet<>();
    @OneToMany(mappedBy = "team", fetch = FetchType.LAZY)
    @JsonIgnore
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
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getStadium() {
        return stadium;
    }
    public void setStadium(String stadium) {
        this.stadium = stadium;
    }
    public String getCoach() {
        return coach;
    }
    public void setCoach(String coach) {
        this.coach = coach;
    }
    public String getFoundation_year() {
        return foundation_year;
    }
    public void setFoundation_year(String foundation_year) {
        this.foundation_year = foundation_year;
    }
    public String getSlogan() {
        return slogan;
    }
    public void setSlogan(String slogan) {
        this.slogan = slogan;
    }
    public int getRanking() {
        return ranking;
    }
    public void setRanking(int ranking) {
        this.ranking = ranking;
    }
    public Set<Player> getPlayers() {
        return players;
    }
    public void setPlayers(Set<Player> players) {
        this.players = players;
    }
    public Set<Goal> getGoals() {
        return goals;
    }
    public void setGoals(Set<Goal> goals) {
        this.goals = goals;
    }
    public int getIn_league() {
        return in_league;
    }
    public void setIn_league(int in_league) {
        this.in_league = in_league;
    }
    public byte[] getLogo() {
        return logo;
    }
    public void setLogo(byte[] logo) {
        this.logo = logo;
    }
    public int getPoints() {
        return points;
    }
    public void setPoints(int points) {
        this.points = points;
    }
    public int getWins() {
        return wins;
    }
    public void setWins(int wins) {
        this.wins = wins;
    }
    public int getTies() {
        return ties;
    }
    public void setTies(int ties) {
        this.ties = ties;
    }
    public int getLoses() {
        return loses;
    }
    public void setLoses(int loses) {
        this.loses = loses;
    }
}
