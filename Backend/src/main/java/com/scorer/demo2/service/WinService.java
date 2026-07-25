package com.scorer.demo2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Sort;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.model.Win;
import com.scorer.demo2.repos.WinRepos;

@Service
public class WinService {

    @Autowired
    WinRepos winRepos;

    public void addWin (Match match, Team team) {
        Win win = new Win();
        win.setMatch(match);
        win.setTeam(team);
        winRepos.save(win);
    }

    public void deleteWinByMatch (Long match_id) {
        winRepos.deleteWinByMatch(match_id);
    }

    public void deleteWinsByTeam (Long team_id) {
        winRepos.deleteWinsByTeam(team_id);
    }

        public void deleteWins (int size) {
        List<Win> noMatchWins = winRepos.findAll().stream()
        .filter(p -> p.getMatch() == null)
        .toList();
        if (noMatchWins.size() > size || noMatchWins.size() == size)
            for ( int i = 0; i < size; i++)
                winRepos.deleteById(noMatchWins.get(i).getId());
        else if (noMatchWins.size() == 0 ) {
            List<Win> delWins = winRepos.findAll(
                PageRequest.of(0, size, Sort.by("id"))).getContent();            
            winRepos.deleteAll(delWins);
        } else {
            int matchWinsNo = size - noMatchWins.size();
            if (matchWinsNo > 0) {
                for ( int i = 0 ; i < size - matchWinsNo; i++) 
                    winRepos.deleteById(noMatchWins.get(i).getId());
                List<Win> delWins = winRepos.findAll(
                    PageRequest.of(0, matchWinsNo, Sort.by("id"))).getContent();            
                winRepos.deleteAll(delWins);
            }
        }
    }

    public int getWinByMatch (Long match_id) {
        return winRepos.getWinByMatch(match_id);
    }

    public int getWinsByTeam (Long team_id) {
        return winRepos.getWinsByTeam(team_id);
    }

    public void deleteAllWins () {
        winRepos.deleteAll();
    }

}
