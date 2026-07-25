package com.scorer.demo2.controllers;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scorer.demo2.model.Player;
import com.scorer.demo2.model.Team;
import com.scorer.demo2.service.PlayerService;
import com.scorer.demo2.service.TeamService;

@RestController
public class PlayerController {

    @Autowired
    PlayerService playerService;

    @Autowired
    TeamService teamService;

    @GetMapping("/admin/getPlayer/{id}")
    public Player getPlayer (@PathVariable("id") Long id) {
        return playerService.getPlayer(id);
    }

    @GetMapping("/admin/getPlayers")
    public List<Player> getAllPlayers (){
        return playerService.getAllPlayers();
    }

    @GetMapping("/admin/getPlayersByTeam/{team_id}")
    public Set<Player> getPlayerBtTeam (@PathVariable("team_id") Long team_id) {
        return playerService.getPlayersByTeam(team_id);
    }

    @PostMapping("/admin/changePlayerTeam/{id}/{team_id}")
    public void changePlayerTeam(@PathVariable("id") Long id, @PathVariable("team_id") Long team_id) {
        playerService.changePlayerTeam(id, team_id);
    }

    @PostMapping("/admin/removePlayer/{id}")
    public void removePlayer (@PathVariable("id") Long id) {
        playerService.removePlayer(id);
    }

    @PostMapping("/admin/removePlayersByTeam/{team_id}")
    public void removePlayersByTeam (@PathVariable("team_id") Long team_id) {
        playerService.removePlayersByTeam(team_id);
    }

    @PostMapping("/admin/editPlayerData/{id}/{num}/{name}/{birthdate}/{natio}/{team_id}/{pos}")
    public void editPlayerData ( 
        @PathVariable("id") Long id,
        @PathVariable("num") int num,
        @PathVariable("name") String name,
        @PathVariable("birthdate") LocalDate birthdate,
        @PathVariable("natio") String natio,
        @PathVariable("team_id") Long team_id,
        @PathVariable("pos") String pos 
    ) {
        playerService.editPlayerData(id, num, name, birthdate, natio, team_id, pos);
    }

    @PutMapping("admin/addPlayer/{num}/{name}/{birthdate}/{natio}/{team_id}/{pos}")
    public void addPlayer (
        @PathVariable("num") int num,
        @PathVariable("name") String name,
        @PathVariable("birthdate") LocalDate birthdate,
        @PathVariable("natio") String natio,
        @PathVariable("team_id") Long team_id,
        @PathVariable("pos") String pos
    ) {
        Player player = new Player();
        Team team = teamService.getTeam(team_id);
        player.setName(name);
        player.setNatio(natio);
        player.setNum(num);
        player.setTeam(team);
        player.setBirthdate(birthdate);
        player.setPos(pos);
        playerService.addPlayer(player);
    }
}
