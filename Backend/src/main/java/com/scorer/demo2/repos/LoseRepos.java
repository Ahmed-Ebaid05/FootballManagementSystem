package com.scorer.demo2.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Lose;

import jakarta.transaction.Transactional;

@Repository
public interface LoseRepos extends JpaRepository <Lose, Long>{
    @Query(value = "SELECT COUNT(*) FROM loses WHERE match_id = :match_id", nativeQuery = true)
    int getLoseByMatch(@Param("match_id") Long match_id);

    @Query(value = "SELECT COUNT(*) FROM loses WHERE team_id = :team_id", nativeQuery = true)
    int getLosesByTeam(@Param("team_id") Long team_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Lose l WHERE l.match.id = :match_id")
    void deleteLoseByMatch (@Param("match_id") Long match_id);

    @Modifying
    @Transactional
    @Query("DELETE FROM Lose l WHERE l.team.id = :team_id")
    void deleteLosesByTeam (@Param("team_id") Long team_id);

}
