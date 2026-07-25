package com.scorer.demo2.repos;

import java.util.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Goal;

@Repository
public interface GoalRepos extends JpaRepository <Goal, Long>{

    @Query("SELECT g FROM Goal g WHERE g.match.id = :match_id")
    public List<Goal> getByMatch (@Param("match_id") Long match_id);

    @Modifying
    @Query("DELETE FROM Goal")
    void deleteAllGoals();

    @Query("SELECT COUNT(g) FROM Goal g WHERE g.team.id = :teamId AND (g.match.match_status = 9 OR g.match.match_status = 10)")
    long countValidGoals(@Param("teamId") Long teamId);

}
