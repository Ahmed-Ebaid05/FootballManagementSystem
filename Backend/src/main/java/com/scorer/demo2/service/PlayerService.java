package com.scorer.demo2.service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scorer.demo2.model.Player;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.repos.PlayerRepos;
import com.scorer.demo2.repos.TeamsRepos;

@Service
public class PlayerService {

    @Autowired
    PlayerRepos playerRepos;

    @Autowired
    TeamsRepos teamRepos;

    public Player getPlayer (Long id) {
        return playerRepos.getById(id);
    }

    public Set<Player> getPlayersByTeam (Long team_id) {
        Team team = teamRepos.getById(team_id);
        return team.getPlayers();
    }

    public List<Player> getAllPlayers () {
        return playerRepos.findAll();
    }

    public void addPlayer (Player player) {
        playerRepos.save(player);
    }

    public void changePlayerTeam(Long id, long team_id) {
        Player player = playerRepos.findById(id).orElse(null);
        player.setTeam(teamRepos.findById(team_id).orElse(null));
        playerRepos.save(player);
    }

    public void removePlayer (Long id) {
        Player player = playerRepos.findById(id).orElse(null);
        playerRepos.delete(player);
    }

    public void removePlayersByTeam (Long team_id) {
        List<Player> players = playerRepos.findAll().stream()
        .filter(p -> p.getTeam().getId() == team_id).toList();
        for (Player player: players) {
            playerRepos.delete(player);
        }
    }

    public void editPlayerData (Long id, int num, String name, LocalDate birthdate, String natio, Long team_id, String pos) {
        Player player = playerRepos.findById(id).orElse(null);
        Team team = teamRepos.findById(team_id).orElse(null);
        player.setName(name);
        player.setNatio(natio);
        player.setPos(pos);
        player.setTeam(team);
        player.setNum(num);
        player.setBirthdate(birthdate);
        player.setPos(pos);
        playerRepos.save(player);
    }

}
