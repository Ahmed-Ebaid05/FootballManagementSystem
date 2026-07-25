package com.scorer.demo2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.service.LoseService;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.TeamService;

@RestController
public class LoseController {

    @Autowired
    LoseService loseService;

    @Autowired
    MatchService matchService;

    @Autowired
    TeamService teamService;

    @GetMapping("/getLosesByTeam/{team_id}")
    public int getLosesByTeam (@PathVariable("team_id") Long team_id) {
        return loseService.getLosesByTeam(team_id);
    }

    @GetMapping("/deleteLoseByMatch/{match_id}")
    public int deleteLoseByMatch (@PathVariable("match_id") Long match_id) {
        return loseService.getLosesByTeam(match_id);
    }

    @PutMapping("/addLose/{match_id}/{team_id}")
    public void addLose (@PathVariable("match_id") Long match_id, @PathVariable("team_id") Long team_id) {
        Match match = matchService.getMatch(match_id);
        Team team = teamService.getTeam(team_id);
        loseService.addLose(match, team);
    }

}
