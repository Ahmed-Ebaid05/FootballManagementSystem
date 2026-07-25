package com.scorer.demo2.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.scorer.demo2.model.Goal;
import com.scorer.demo2.service.GoalService;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.PlayerService;
import com.scorer.demo2.service.TeamService;

@RestController
public class GoalController {

    @Autowired
    GoalService goalService;

    @Autowired
    TeamService teamService;

    @Autowired
    MatchService matchService;

    @Autowired
    PlayerService playerService;

    @GetMapping("/getAllGoals")
    public List<Goal> getAllGoals( ) {
        return goalService.getAllGoals();
    }

    @PostMapping("/admin/deleteGoalByMatch/{match_id}")
    public void deleteGoals (@PathVariable("match_id") Long match_id) {
        goalService.deleteGoals(match_id);
    }

    @GetMapping("/getGoalByTeam/{team_id}")
    public Long getGoalsByTeam (@PathVariable("team_id") Long team_id) {
        return goalService.getGoalsByTeam(team_id);
    }

    @GetMapping("/getTableGoalsCount")
    public List<Long> getGoalsTable () {
        return goalService.getTableGoals();
    }

    @PostMapping("/admin/addGoal/{match_id}/{player_id}/{team_id}/{min}/{sec}")
    public void addGoal(
        @PathVariable("match_id") Long match_id,
        @PathVariable("player_id") Long player_id,
        @PathVariable("team_id") Long team_id,
        @PathVariable("min") int min,
        @PathVariable("sec") int sec) {
        Goal goal = new Goal();
        goal.setTeam(teamService.getTeam(team_id));
        goal.setPlayer(playerService.getPlayer(player_id));
        goal.setMatch(matchService.getMatch(match_id));
        goal.setGoal_time_min(min);
        goal.setGoal_time_sec(sec);
        goalService.addGoal(goal);
    }

}
