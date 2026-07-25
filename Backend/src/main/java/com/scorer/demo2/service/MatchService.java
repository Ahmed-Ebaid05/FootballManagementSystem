package com.scorer.demo2.service;

import java.time.*;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.repos.MatchRepos;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class MatchService {

    @Autowired
    MatchRepos matchRepos;

    @Autowired
    TeamService teamService;

    @Autowired
    PenaltyService penaltyService;

    @Autowired
    GoalService goalService;

    @Autowired
    WinService winService;

    @Autowired
    LoseService loseService;

    @Autowired
    TieService tieService;

    @Autowired
    PointService pointService;

    public List<Match> getMatches () {
        return matchRepos.findAll(); 
    }

    public void changeStatus (Long id, int statues) {
        matchRepos.getById(id).setMatch_status(statues);
        deletingMatchResults(id);
        teamService.addingMatchResults(matchRepos.findById(id).orElse(null));
    }

    public Match getMatch (Long id) {
        return matchRepos.findById(id).orElse(null);
    }

    public List<Match> getMatchesByRound (int round) {
        return matchRepos.findAll().stream()
        .filter(m -> m.getMatch_round() == round).toList();
    }

    public List<Match> getMatchesByStatus (int status) {
        return matchRepos.findAll().stream()
        .filter(m -> m.getMatch_status() == status).toList();
    }

    public int getRoundsNumber () {
        return matchRepos.getRoundsNumber();
    }

    public Long getMatchesNumberInRound (int round) {
        return matchRepos.findAll().stream()
            .filter(m -> m.getMatch_round() == round)
            .count();
    }

    public void deletingMatchResults (Long match_id) {
        winService.deleteWinByMatch(match_id);
        loseService.deleteLoseByMatch(match_id);
        tieService.deleteTieByMatch(match_id);
        pointService.deletePointsByMatch(match_id);
    }

    public void deleteMatchById (Long id) {
        penaltyService.deleteMatchPenalties(id);
        goalService.deleteGoals(id);
        pointService.deletePointsByMatch(id);
        winService.deleteWinByMatch(id);
        loseService.deleteLoseByMatch(id);
        tieService.deleteTieByMatch(id);
        matchRepos.deleteById(id);
    }

    public void insertMatch (
        Long home_id,
        Long away_id,
        LocalDate match_date,
        int match_status,
        int match_round,
        LocalTime match_time
    ) {
        matchRepos.insertingMatch(
            home_id,
            away_id,
            match_date,
            match_status,
            match_round,
            match_time
        );
    }

    public void makingMatches(int rounds, int categories, int [] hrs, int [] mins) {

        penaltyService.deletaAllPenalty();
        goalService.deletaAllGoals();
        winService.deleteAllWins();
        loseService.deleteAllLoses();
        tieService.deleteAllTies();
        pointService.deleteAllPoints();
        matchRepos.deleteAll(); 
        teamService.setAllDataZero();

        List<Team> mainTeams = new ArrayList<>(teamService.getTeamsInLeague()
            .stream().filter(t -> t.getIn_league() == 1).toList());
        Collections.shuffle(mainTeams);

        int matchesPerCategory = (mainTeams.size() / 2 ) / categories;
        int remainder = (mainTeams.size() / 2 ) % categories;

        List<Integer> categorySizes = new ArrayList<>();
        for (int c = 0; c < categories; c++) {
            int size = matchesPerCategory;
            if (c == categories - 1) {
                size += remainder;
            }
            categorySizes.add(size);
        }

        LocalDate date = LocalDate.now().minusMonths(1);

        for (int r = 0; r < rounds; r++) {
            int matchIndex = 0;
            for (int c = 0; c < categories; c++) {
                int size = categorySizes.get(c);
                LocalTime timeForCategory = LocalTime.of(hrs[c], mins[c]);

                for (int m = 0; m < size; m++) {
                    if (matchIndex >= mainTeams.size() || (mainTeams.size() - 1 - matchIndex) < 0) 
                        break;

                    insertMatch(
                        mainTeams.get(matchIndex).getId(),
                        mainTeams.get(mainTeams.size() - 1 - matchIndex).getId(),
                        date,
                        0,
                        r + 1,
                        timeForCategory
                    );

                    matchIndex++;
                }
            }

            Team first = mainTeams.get(1);
            for (int t = 1; t < mainTeams.size() - 1; t++) {
                mainTeams.set(t, mainTeams.get(t + 1));
            }
            mainTeams.set(mainTeams.size() - 1, first);

            date = date.plusDays(7);
        }
    }

}
