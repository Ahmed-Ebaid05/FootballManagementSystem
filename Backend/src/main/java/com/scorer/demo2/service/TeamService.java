package com.scorer.demo2.service;

import com.scorer.demo2.repos.GoalRepos;
import java.util.*;
import java.util.stream.Collectors;

import com.scorer.demo2.model.Team;
import com.scorer.demo2.model.Match;
import com.scorer.demo2.repos.TeamsRepos;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class TeamService {

    @Autowired
    TeamsRepos teamRepos;
    @Autowired
    PointService pointService;
    @Autowired
    WinService winService;
    @Autowired
    LoseService loseService;
    @Autowired
    TieService tieService;
    @Autowired
    GoalRepos goalRepos;

    public List<Team> getTeamsInLeague() {
        return teamRepos.findAll().stream()
            .filter(t -> t.getIn_league() == 1)
            .toList();
    }
    public List<Team> getTeamsOutLeague() {
        return teamRepos.findAll().stream()
            .filter(t -> t.getIn_league() == 2)
            .toList();
    }
    public List<Team> getAllTeams () {
        return teamRepos.findAll();
    }
    public Team getTeam (Long id) {
        return teamRepos.getById(id);
    }
    public void addingPoints (int points, Long id) {
        teamRepos.addingPoints(points, id);
    }
    public void addingWins (int wins, Long id) {
        teamRepos.addingWins(wins, id);
    }
    public void addingLoses (int loses, Long id) {
        teamRepos.addingLoses(loses, id);
    }
    public void addingTies (int ties, Long id) {
        teamRepos.addingTies(ties, id);
    }
    public void editTeamLeague (long id, int league) {
        Team team = teamRepos.findById(id).orElse(null);
        team.setIn_league(league);
        teamRepos.save(team);
    }
    public Long addNewTeam (String name, String foundation_year, String coach, String stadium, String slogan, int in_league, int ranking, byte[] logo) {
        Team team = new Team();
        team.setName(name);
        team.setFoundation_year(foundation_year);
        team.setCoach(coach);
        team.setStadium(stadium);
        team.setSlogan(slogan);
        team.setIn_league(in_league);
        team.setRanking(ranking);
        team.setLogo(logo);
        teamRepos.save(team);
        return team.getId();
    }
    public void addResults (int wins, int loses, int ties, Long team_id) {
        Team team = teamRepos.findById(team_id).orElse(null);
        for ( int i = 0; i < wins; i++) {
            winService.addWin(null, team);
            pointService.addPoints(3, null, team);
        }
        for ( int i = 0; i < loses; i++) 
            loseService.addLose(null, team);
        for ( int i = 0; i < ties; i++) {
            tieService.addTie(null, team);
            pointService.addPoints(1, null, team);
        }
    }
    public boolean deleteResults (int wins, int loses, int ties, Long team_id) {
        Team team = teamRepos.findById(team_id).orElse(null);
        if (team.getWins() < wins || team.getLoses() < loses || team.getTies() < ties)
            return false;
        else {
            if (wins != 0) {
                winService.deleteWins(wins);
                pointService.deletePoints(3 * wins);
                team.setWins(team.getWins() - wins);
            }
            if (loses != 0) {
                loseService.deleteLoses(loses);
                team.setLoses(team.getLoses() - loses);
            }
            if (ties != 0) {
                tieService.deleteTies(ties);
                pointService.deletePoints(ties);
                team.setTies(team.getTies() - ties);
            }
            return true;
        }
    }
    public void addingMatchResults (Match match) {

        if ( match.getMatch_status() == 9 || match.getMatch_status() == 10 ) {

            Team HomeTeam = match.getHomeTeam();
            Team AwayTeam = match.getAwayTeam();

            int HomeResult;
            int AwayResult; 
            if (match.getMatch_status() == 9) {
                HomeResult = (int)match.getGoals().stream()
                .filter(g -> g.getTeam().equals(match.getHomeTeam()))
                .count();

                AwayResult = (int)match.getGoals().stream()
                    .filter(g -> g.getTeam().equals(match.getAwayTeam()))
                    .count();
            } else {
                HomeResult = (int)match.getPenalties().stream()
                    .filter(p -> p.getTeam().equals(match.getHomeTeam()) && p.isScored())
                    .count();

                AwayResult = (int)match.getPenalties().stream()
                    .filter(p -> p.getTeam().equals(match.getAwayTeam()) && p.isScored())
                    .count();
            }

            if (HomeResult > AwayResult) {
                pointService.addPoints(3, match, HomeTeam);
                winService.addWin(match, HomeTeam);
                loseService.addLose(match, AwayTeam);
            } else if (HomeResult < AwayResult) {
                pointService.addPoints(3, match, AwayTeam);
                winService.addWin(match, AwayTeam);
                loseService.addLose(match, HomeTeam);
            } else if (HomeResult == AwayResult) {
                pointService.addPoints(1, match, AwayTeam);
                pointService.addPoints(1, match, HomeTeam);
                tieService.addTie(match, HomeTeam);
                tieService.addTie(match, AwayTeam);
            }
        }

        makingTable();
    }

    public void setAllDataZero () {
        List<Team> teams = teamRepos.findAll();
        for (Team team: teams) {
            team.setPoints(0);
            team.setWins(0);
            team.setLoses(0);
            team.setTies(0);
            team.setRanking(1);
        }

    }

    public void makingTable () {

        List<Team> teams = 
        teamRepos.findAll().stream()
        .filter(t -> t.getIn_league() == 1)
        .collect(Collectors.toList());

        teams.sort ((t1, t2) -> {

            int homeGoals = (int) goalRepos.findAll().stream()
                .filter(g -> g.getTeam().getId() == t1.getId() &&
                    (g.getMatch().getMatch_status() == 9 || g.getMatch().getMatch_status() == 10))
                .count();

            int awayGoals = (int) goalRepos.findAll().stream()
                .filter(g -> g.getTeam().getId() == t2.getId() &&
                    (g.getMatch().getMatch_status() == 9 || g.getMatch().getMatch_status() == 10))
                .count();

            int cmp = Integer.compare(pointService.getPointsByTeam(t2.getId()), pointService.getPointsByTeam(t1.getId()));
            if ( cmp != 0)
                return cmp;
            cmp = Integer.compare(awayGoals, homeGoals);
            if ( cmp != 0)
                return cmp;
            cmp = Integer.compare(winService.getWinsByTeam(t2.getId()), winService.getWinsByTeam(t1.getId()));
            if ( cmp != 0)
                return cmp;
            return cmp = Integer.compare(loseService.getLosesByTeam(t1.getId()), loseService.getLosesByTeam(t2.getId()));
        });

        teams.get(0).setRanking(1);

        for (int t = 0; t < teams.size() - 1; t++) {

            Team t1 = teams.get(t);
            Team t2 = teams.get(t + 1);

            t1.setPoints(pointService.getPointsByTeam(t1.getId()));
            t1.setWins(winService.getWinsByTeam(t1.getId()));
            t1.setLoses(loseService.getLosesByTeam(t1.getId()));
            t1.setTies(tieService.getTiesByTeam(t1.getId()));

            t2.setPoints(pointService.getPointsByTeam(t2.getId()));
            t2.setWins(winService.getWinsByTeam(t2.getId()));
            t2.setLoses(loseService.getLosesByTeam(t2.getId()));
            t2.setTies(tieService.getTiesByTeam(t2.getId()));

            if (t1.getPoints() == t2.getPoints() &&
                t1.getWins() == t2.getWins() &&
                t1.getLoses() == t2.getLoses() &&
                t1.getTies() == t2.getTies() &&
                t1.getGoals().size() == t2.getGoals().size())
                    t2.setRanking(t1.getRanking()); 
                else
                    t2.setRanking(t + 2);
        }
    }

    public List<Team> getTable () {
        return teamRepos.getTableTeams();
    }

}