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
import com.scorer.demo2.service.WinService;

@RestController
public class WinController {

    @Autowired
    WinService winService;

    @Autowired
    MatchService matchService;

    @Autowired
    TeamService teamService;

    @GetMapping("/getWinsByTeam/{team_id}")
    public int getWinsByTeam (@PathVariable("team_id") Long team_id) {
        return winService.getWinsByTeam(team_id);
    }

    @GetMapping("/deleteWinByMatch/{match_id}")
    public int deleteWinByMatch (@PathVariable("match_id") Long match_id) {
        return winService.getWinsByTeam(match_id);
    }

    @PutMapping("/addWin/{match_id}/{team_id}")
    public void addWin (@PathVariable("match_id") Long match_id, @PathVariable("team_id") Long team_id) {
        Match match = matchService.getMatch(match_id);
        Team team = teamService.getTeam(team_id);
        winService.addWin(match, team);
    }

}
