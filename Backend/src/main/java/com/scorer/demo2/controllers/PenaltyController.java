package com.scorer.demo2.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scorer.demo2.model.Penalty;
import com.scorer.demo2.model.Player;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.PenaltyService;
import com.scorer.demo2.service.PlayerService;
import com.scorer.demo2.service.TeamService;

@RestController
public class PenaltyController {

    @Autowired
    PenaltyService penaltyService;

    @Autowired
    MatchService matchService;

    @Autowired
    TeamService teamService;

    @Autowired
    PlayerService playerService;

    @PostMapping ("/admin/addPenalty/{match_id}/{player_id}/{team_id}/{scored}/{num}")
    public void addPenalty (
        @PathVariable("match_id") Long match_id,
        @PathVariable("player_id") Long player_id,
        @PathVariable("team_id") Long team_id,
        @PathVariable("scored") boolean scored,
        @PathVariable("num") int num
    ) {
        Penalty penalty = new Penalty();
        penalty.setMatch(matchService.getMatch(match_id));
        penalty.setTeam(teamService.getTeam(team_id));
        penalty.setPlayer(playerService.getPlayer(player_id));
        penalty.setScored(scored);
        penalty.setNum(num);
        penaltyService.addPenalty(penalty);
    }

    @PostMapping("/admin/deletePenalty/{id}")
    public void deletePenalty (@PathVariable("id") Long id) {
        penaltyService.deletePenalty(id);
    }

    @PostMapping("/admin/deletePenaltiesByMatch/{match_id}")
    public void deleteMatchPenalties (@PathVariable ("match_id") Long match_id) {
        penaltyService.deleteMatchPenalties(match_id);
    }

    @GetMapping("/admin/getAllPenalties")
    public List<Penalty> getAllPenalties (){
        return penaltyService.getAllPenalties();
    }

}
