package com.scorer.demo2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scorer.demo2.model.Penalty;
import com.scorer.demo2.repos.PenaltyRepos;

@Service
public class PenaltyService {

    @Autowired
    PenaltyRepos penaltyRepos;

    public void addPenalty (Penalty penalty) {
        penaltyRepos.save(penalty);
    }

    public void deletePenalty (Long id) {
        penaltyRepos.deleteById(id);
    }

    public void deletaAllPenalty () {
        penaltyRepos.deleteAll();
    }

    public void deleteMatchPenalties (Long match_id) {
        List<Penalty> penalties =  penaltyRepos.findAll().stream()
        .filter(p -> p.getMatch().getId() == match_id).toList(); 
        for ( Penalty penalty: penalties ) {
            penaltyRepos.delete(penalty);
        }
    }

    public List<Penalty> getAllPenalties() {
        return penaltyRepos.findAll();
    }
}
