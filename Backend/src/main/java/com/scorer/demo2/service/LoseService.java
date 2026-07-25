package com.scorer.demo2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.scorer.demo2.model.Lose;
import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.model.Win;
import com.scorer.demo2.repos.LoseRepos;

@Service
public class LoseService {

    @Autowired
    LoseRepos loseRepos;

    public void addLose (Match match, Team team) {
        Lose lose = new Lose();
        lose.setMatch(match);
        lose.setTeam(team);
        loseRepos.save(lose);
    }

    public void deleteLoses (int size) {
        List<Lose> noMatchLoses = loseRepos.findAll().stream()
        .filter(p -> p.getMatch() == null)
        .toList();
        if (noMatchLoses.size() > size || noMatchLoses.size() == size)
            for ( int i = 0; i < size; i++)
                loseRepos.deleteById(noMatchLoses.get(i).getId());
        else if (noMatchLoses.size() == 0 ) {
            List<Lose> delLosees = loseRepos.findAll(
                PageRequest.of(0, size, Sort.by("id"))).getContent();            
            loseRepos.deleteAll(delLosees);
        } else {
            int matchLosesNo = size - noMatchLoses.size();
            if (matchLosesNo > 0) {
                for ( int i = 0 ; i < size - matchLosesNo; i++) 
                    loseRepos.deleteById(noMatchLoses.get(i).getId());
                List<Lose> delLosees = loseRepos.findAll(
                    PageRequest.of(0, matchLosesNo, Sort.by("id"))).getContent();            
                loseRepos.deleteAll(delLosees);
            }
        }
    }

    public void deleteLoseByMatch (Long match_id) {
        loseRepos.deleteLoseByMatch(match_id);
    }

    public void deleteLosesByTeam (long team_id) {
        loseRepos.deleteLosesByTeam(team_id);
    }

    public int getLoseByMatch (Long match_id) {
        return loseRepos.getLoseByMatch(match_id);
    }

    public int getLosesByTeam (Long team_id) {
        return loseRepos.getLosesByTeam(team_id);
    }

    public void deleteAllLoses () {
        loseRepos.deleteAll();
    }

}
