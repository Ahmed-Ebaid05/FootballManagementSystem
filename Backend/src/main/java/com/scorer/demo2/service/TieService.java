package com.scorer.demo2.service;

import com.scorer.demo2.repos.TieRepos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.model.Tie;

@Service
public class TieService {

    @Autowired
    TieRepos tieRepos;

    public void addTie (Match match, Team team) {
        Tie tie = new Tie();
        tie.setMatch(match);
        tie.setTeam(team);
        tieRepos.save(tie);
    }

    public void deleteTies (int size) {
        List<Tie> noMatchTies = tieRepos.findAll().stream()
        .filter(p -> p.getMatch() == null)
        .toList();
        if (noMatchTies.size() > size || noMatchTies.size() == size)
            for ( int i = 0; i < size; i++)
                tieRepos.deleteById(noMatchTies.get(i).getId());
        else if (noMatchTies.size() == 0 ) {
            List<Tie> delTies = tieRepos.findAll(
                PageRequest.of(0, size, Sort.by("id"))).getContent();            
            tieRepos.deleteAll(delTies);
        } else {
            int matchTiesNo = size - noMatchTies.size();
            if (matchTiesNo > 0) {
                for ( int i = 0 ; i < size - matchTiesNo; i++) 
                    tieRepos.deleteById(noMatchTies.get(i).getId());
                List<Tie> delTies = tieRepos.findAll(
                    PageRequest.of(0, matchTiesNo, Sort.by("id"))).getContent();            
                tieRepos.deleteAll(delTies);
            }
        }
    }

    public void deleteTieByMatch (Long match_id) {
        tieRepos.deleteTieByMatch(match_id);
    }

    public void deleteTiesByTeam (long team_id) {
        tieRepos.deleteTiesByTeam(team_id);
    }

    public int getTieByMatch (Long match_id) {
        return tieRepos.getTieByMatch(match_id);
    }

    public int getTiesByTeam (Long team_id) {
        return tieRepos.getTiesByTeam(team_id);
    }

    public void deleteAllTies () {
        tieRepos.deleteAll();
    }

}
