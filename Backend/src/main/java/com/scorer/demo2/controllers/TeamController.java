package com.scorer.demo2.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.scorer.demo2.controllers.TeamController;
import com.scorer.demo2.service.GoalService;
import com.scorer.demo2.service.MatchService;
import com.scorer.demo2.service.PenaltyService;
import com.scorer.demo2.service.PlayerService;
import com.scorer.demo2.service.TeamService;
import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
    public class TeamController {

    @Autowired
    TeamService teamService;

    @Autowired
    GoalService goalService;

    @Autowired
    PenaltyService penaltyService;

    @Autowired
    MatchService matchService;

    @Autowired
    PlayerService playerService;

    @GetMapping("/getTeamsInLeague")
    public List<Team> getTeamsInLeague() {
        return teamService.getTeamsInLeague();
    }

    @GetMapping("/admin/getTeamsOutLeague")
    public List<Team> getTeamsOutLeague() {
        return teamService.getTeamsOutLeague();
    }

    @GetMapping("/admin/getAllTeams")
    public List<Team> getAllTeams() {
        return teamService.getAllTeams();
    }

    @GetMapping("/getTeam/{id}")
    public Team getTeam(@PathVariable("id") Long id) {
        return teamService.getTeam(id);
    }

    @GetMapping("/getTable/")
    public List<Team> getTable() {
        return teamService.getTable();
    }

    @PostMapping("/makingTable")
    public void makingTable() {
        teamService.makingTable();
    }

    @PostMapping("/admin/editTeamLeague/{id}/{league}")
    public void editTeamLeague (@PathVariable ("id") Long id, @PathVariable ("league") int league) {
        teamService.editTeamLeague(id, league);
    }

    @PostMapping("/admin/addMatchResults/{match_id}")
    public void editTeamLeague (@PathVariable ("match_id") Long match_id) {
        Match match = matchService.getMatch(match_id);
        teamService.addingMatchResults(match);
    }

    @PostMapping("/admin/addResults/{wins}/{loses}/{ties}/{team_id}")
    public void addResults (
        @PathVariable("wins") int wins,
        @PathVariable("loses") int loses,
        @PathVariable("ties") int ties,
        @PathVariable("team_id") Long team_id
    ) {
        teamService.addResults(wins, loses, ties, team_id);
    }

    @PostMapping("/admin/deleteResults/{wins}/{loses}/{ties}/{team_id}")
    public boolean deleteResults (
        @PathVariable("wins") int wins,
        @PathVariable("loses") int loses,
        @PathVariable("ties") int ties,
        @PathVariable("team_id") Long team_id
    ) {
        return teamService.deleteResults(wins, loses, ties, team_id);
    }

    @PutMapping("/admin/addNewTeam")
    public Long addNewTeam (
        @RequestParam("name") String name,
        @RequestParam("foundation_year") String foundation_year,
        @RequestParam("coach") String coach,
        @RequestParam("stadium") String stadium,
        @RequestParam("slogan") String slogan,
        @RequestParam("in_league") int in_league,
        @RequestParam("ranking") int ranking,
        @RequestParam("logo") MultipartFile logo
    )  {
        byte[] logoBytes = null;
        try {
            logoBytes = logo.getBytes();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return teamService.addNewTeam(name, foundation_year, coach, stadium, slogan, in_league, ranking, logoBytes);
    }
}