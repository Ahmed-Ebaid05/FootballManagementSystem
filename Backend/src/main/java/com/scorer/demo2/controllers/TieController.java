package com.scorer.demo2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.TeamService;
import com.scorer.demo2.service.TieService;

@RestController
public class TieController {

    @Autowired
    TieService tieService;

    @Autowired
    MatchService matchService;

    @Autowired
    TeamService teamService;

    @GetMapping("/getTiesByTeam/{team_id}")
    public int getTiesByTeam (@PathVariable("team_id") Long team_id) {
        return tieService.getTiesByTeam(team_id);
    }

    @GetMapping("/deleteTieByMatch/{match_id}")
    public int deleteTieByMatch (@PathVariable("match_id") Long match_id) {
        return tieService.getTiesByTeam(match_id);
    }

    @PutMapping("/addTie/{match_id}/{team_id}")
    public void addTie (@PathVariable("match_id") Long match_id, @PathVariable("team_id") Long team_id) {
        Match match = matchService.getMatch(match_id);
        Team team = teamService.getTeam(team_id);
        tieService.addTie(match, team);
    }

}
