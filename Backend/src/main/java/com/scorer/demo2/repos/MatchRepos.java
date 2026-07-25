package com.scorer.demo2.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.scorer.demo2.model.Match;
import java.time.*;

@Repository
public interface MatchRepos extends JpaRepository <Match, Long> {

    @Modifying
    @Query(value = "INSERT INTO matches " +  "(home_id, away_id, match_date, match_status, match_round, match_time)" + 
            " VALUES (:home_id, :away_id, :match_date, :match_status, :match_round, :match_time)", 
            nativeQuery = true)
    void insertingMatch(
        @Param("home_id") Long home_id,
        @Param("away_id") Long away_id,
        @Param("match_date") LocalDate match_date,
        @Param("match_status") int match_stwatus,
        @Param("match_round") int match_round,
        @Param("match_time") LocalTime match_time
    );

    @Query(value = "SELECT MAX(match_round) FROM matches" ,nativeQuery = true)
    int getRoundsNumber ();

}
