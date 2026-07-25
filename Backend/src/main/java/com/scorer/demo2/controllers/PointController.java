package com.scorer.demo2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.PointService;
import com.scorer.demo2.service.TeamService;

@RestController
public class PointController {

    @Autowired
    PointService PointService;

    @Autowired
    MatchService matchService;

    @Autowired
    TeamService teamService;

    @GetMapping("/getPointsByTeam/{team_id}")
    public int getPointsByTeam (@PathVariable("team_id") Long team_id) {
        return PointService.getPointsByTeam(team_id);
    }

    @GetMapping("/deletePointByMatch/{match_id}")
    public int deletePointByMatch (@PathVariable("match_id") Long match_id) {
        return PointService.getPointsByTeam(match_id);
    }

    @PutMapping("/addPoint/{match_id}/{team_id}/{size}")
    public void addPoint (
        @PathVariable("match_id") Long match_id,
        @PathVariable("team_id") Long team_id,
        @PathVariable("size") int size
    ) {
        Match match = matchService.getMatch(match_id);
        Team team = teamService.getTeam(team_id);
        PointService.addPoints(size ,match, team);
    }

}
