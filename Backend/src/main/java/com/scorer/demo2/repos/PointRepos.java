package com.scorer.demo2.repos;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Point;

import jakarta.transaction.Transactional;

@Repository
public interface PointRepos extends JpaRepository <Point, Long>{
    @Query(value = "SELECT COUNT(*) FROM points WHERE team_id = :team_id", nativeQuery = true)
    int getPointsByTeam (@Param("team_id") Long team_id);

    @Query(value = "SELECT COUNT(*) FROM points WHERE match_id = :match_id", nativeQuery = true)
    int getPointsByMatch (@Param("match_id") Long match_id);

    @Query(value = "SELECT COUNT(*) FROM points WHERE match_id = :match_id AND team_id = :team_id", nativeQuery = true)
    int getPointsByMatchAndTeam (@Param("match_id") Long match_id, @Param("team_id") Long team_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Point p WHERE p.match.id = :match_id")
    void deletePointsByMatch(@Param("match_id") Long match_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Point p WHERE p.team.id = :team_id")
    void deletePointsByTeam(@Param("team_id") Long team_id);
}
