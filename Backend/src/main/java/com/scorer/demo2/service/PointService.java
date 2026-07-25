package com.scorer.demo2.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.scorer.demo2.model.Match;
import com.scorer.demo2.model.Point;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.repos.PointRepos;

@Service
public class PointService {

    @Autowired
    PointRepos pointRepos;

    public void addPoints (int size, Match match, Team team) {
        for ( int i = 0; i < size; i++) {
            Point point = new Point();
            point.setMatch(match);
            point.setTeam(team);
            pointRepos.save(point);
        }
    }

    public void deletePoints (int size) {
        List<Point> noMatchPoints = pointRepos.findAll().stream()
        .filter(p -> p.getMatch() == null)
        .toList();
        if (noMatchPoints.size() > size || noMatchPoints.size() == size)
            for ( int i = 0; i < size; i++)
                pointRepos.deleteById(noMatchPoints.get(i).getId());
        else if (noMatchPoints.size() == 0 ) {
            List<Point> delPoints = pointRepos.findAll(
                PageRequest.of(0, size, Sort.by("id"))).getContent();            
            pointRepos.deleteAll(delPoints);
        } else {
            int matchPointsNo = size - noMatchPoints.size();
            if (matchPointsNo > 0) {
                for ( int i = 0 ; i < size - matchPointsNo; i++) 
                    pointRepos.deleteById(noMatchPoints.get(i).getId());
                List<Point> delPoints = pointRepos.findAll(
                    PageRequest.of(0, matchPointsNo, Sort.by("id"))).getContent();                
                pointRepos.deleteAll(delPoints);
            }
        }
    }

    public int getPointsByMatchAndTeam (Long match_id, Long team_id) {
        return pointRepos.getPointsByMatchAndTeam(match_id, team_id);
    }

    public int getPointsByTeam (Long team_id) {
        return pointRepos.getPointsByTeam(team_id);
    }

    public int getPointsByMatch (Long match_id) {
        return pointRepos.getPointsByTeam(match_id);
    }

    public void deletePointsByMatch (Long match_id) {
        pointRepos.deletePointsByMatch(match_id);
    }

    public void deletePointsByTeam (Long team_id) {
        pointRepos.deletePointsByTeam(team_id);
    }

    public void deleteAllPoints () {
        pointRepos.deleteAll();
    }

}
