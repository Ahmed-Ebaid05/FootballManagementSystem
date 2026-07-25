package com.scorer.demo2.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Tie;

import jakarta.transaction.Transactional;

@Repository
public interface TieRepos extends JpaRepository <Tie, Long>{

    @Query(value = "SELECT COUNT(*) FROM ties WHERE match_id = :match_id", nativeQuery = true)
    int getTieByMatch(@Param("match_id") Long match_id);

    @Query(value = "SELECT COUNT(*) FROM ties WHERE team_id = :team_id", nativeQuery = true)
    int getTiesByTeam(@Param("team_id") Long team_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Tie t WHERE t.match.id = :match_id")
    void deleteTieByMatch (@Param("match_id") Long match_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Tie t WHERE t.team.id = :team_id")
    void deleteTiesByTeam (@Param("team_id") Long team_id);

}
