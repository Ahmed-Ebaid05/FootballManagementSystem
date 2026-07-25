package com.scorer.demo2.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scorer.demo2.model.Goal;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.repos.GoalRepos;

@Service
public class GoalService {

    @Autowired
    GoalRepos goalRepos;

    @Autowired
    TeamService teamService;

    public List<Goal> getAllGoals( ) {
        return goalRepos.findAll();
    }

    public Long getGoalsByTeam (Long team_id ) {
        return goalRepos.countValidGoals(team_id);
    }

    public void addGoal(Goal goal) {
        goalRepos.save(goal);
    }

    public void deleteGoals(Long match_id) {
        List<Goal> goals = goalRepos.getByMatch(match_id);
        for (Goal goal: goals )
            goalRepos.delete(goal);
    }

    public void deletaAllGoals () {
        goalRepos.deleteAllGoals(); 
    }

    public List<Long> getTableGoals () {
        List<Team> teams = teamService.getTable();
        System.out.println(teams);
        List<Long> goalsCount = new ArrayList<>();
        for (Team team: teams) {
            goalsCount.add(goalRepos.findAll().stream()
            .filter(g -> g.getTeam().getId() == team.getId() && (g.getMatch().getMatch_status() == 9 || g.getMatch().getMatch_status() == 10 ))
            .count());
        }
        return goalsCount;
    }

}
