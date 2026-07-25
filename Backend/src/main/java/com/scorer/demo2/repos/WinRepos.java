package com.scorer.demo2.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Win;

import jakarta.transaction.Transactional;

@Repository
public interface WinRepos extends JpaRepository <Win, Long>{

    @Query(value = "SELECT COUNT(*) FROM wins WHERE match_id = :match_id", nativeQuery = true)
    int getWinByMatch(@Param("match_id") Long match_id);

    @Query(value = "SELECT COUNT(*) FROM wins WHERE team_id = :team_id", nativeQuery = true)
    int getWinsByTeam(@Param("team_id") Long team_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Win w WHERE w.match.id = :match_id")
    void deleteWinByMatch (@Param("match_id") Long match_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Win w WHERE w.team.id = :team_id")
    void deleteWinsByTeam (@Param("team_id") Long team_id);

}
