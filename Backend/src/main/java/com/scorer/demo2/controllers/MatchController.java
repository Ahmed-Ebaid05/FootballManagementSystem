package com.scorer.demo2.controllers;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.scorer.demo2.model.Match;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.TeamService;

@CrossOrigin(origins = "*")
@RestController
public class MatchController {

    int maxRounds;

    @Autowired
    MatchService matchService;

    @Autowired
    TeamService teamService;

    @GetMapping("/getAllMatches")
    public List<Match> getMatches () {
        return matchService.getMatches();
    }

    @PostMapping("/admin/makingMatches/{rounds}/{categories}/{hrs}/{mins}")
    public void makingMatches (
        @PathVariable("rounds") int rounds,
        @PathVariable("categories") int categories,
        @PathVariable("hrs") int [] hrs,
        @PathVariable("mins") int [] mins
    ) {  
        matchService.makingMatches(rounds, categories, hrs, mins);    
    }

    @PutMapping("/admin/addingMatch/{home_id}/{away_id}/{date}/{hrs}/{mins}")
    public boolean addMatch (
        @PathVariable("home_id") Long home_id,
        @PathVariable("away_id") Long away_id,
        @PathVariable("date") LocalDate date,
        @PathVariable("hrs") int hrs,
        @PathVariable("mins") int mins
    ) {

        if ( LocalDate.now().isBefore(date) && away_id != home_id ) {
            LocalTime time = LocalTime.of(hrs, mins);
            matchService.insertMatch(home_id, away_id, date, 0, 0, time);
            return true;
        } else 
            return false;
    }

    @PostMapping("/admin/deleteMatchById/{id}")
    public void deleteMatchById(@PathVariable("id") Long id) {
        matchService.deleteMatchById(id);
    }

    @GetMapping("/getMatch/{id}")
    public Match getMatch (@PathVariable("id") Long id) {
        return matchService.getMatch(id);
    }

    @PostMapping("/admin/changeStatues/{id}/{status}")
    public void changeStatues (@PathVariable("id") Long id, @PathVariable int status ) {  
        matchService.changeStatus(id, status);
    }

    @PostMapping("/admin/deleteMatchResults/{id}")
    public void changeStatues (@PathVariable("id") Long id) {  
        matchService.deletingMatchResults(id);
    }

    @GetMapping("/getMatchesByRound/{round}")
    public List<Match> getMatchesByRound (@PathVariable("round") int round) {
        return matchService.getMatchesByRound(round);
    }

    @GetMapping("/getMatchesByStatus/{status}") 
    public List<Match> getMatchesBuStatus (@PathVariable("status") int status) {
        return matchService.getMatchesByStatus(status);
    }

    @GetMapping("/getRoundsNumber")
    public int getRoundsNumber () {
        return matchService.getRoundsNumber();
    }

    @GetMapping("/getMatchesNumberInRound/{round}")
    public Long getRoundsNumber (@PathVariable ("round") int round) {
        return matchService.getMatchesNumberInRound(round);
    }

}
