package com.scorer.demo2.repos;

import com.scorer.demo2.model.Team;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamsRepos extends JpaRepository <Team, Long>{

    @Modifying
    @Query("UPDATE Team t SET t.points = t.points + :points WHERE t.id = :id")
    void addingPoints(@Param("points") int points, @Param("id") Long id);

    @Modifying
    @Query("UPDATE Team t SET t.wins = t.wins + :wins WHERE t.id = :id")
    void addingWins (@Param("wins") int wins, @Param("id") Long id);

    @Modifying
    @Query("UPDATE Team t SET t.loses = t.loses + :loses WHERE t.id = :id")
    void addingLoses (@Param("loses") int loses, @Param("id") Long id);

    @Modifying
    @Query("UPDATE Team t SET t.ties = t.ties + :ties WHERE t.id = :id")
    void addingTies (@Param("ties") int wins, @Param("id") Long id);

    @Query(value = "SELECT * FROM teams WHERE in_league = 1 ORDER BY ranking", nativeQuery = true)
    List<Team> getTableTeams ();
}
