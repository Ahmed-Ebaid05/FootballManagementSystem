package com.scorer.demo2.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.scorer.demo2.model.Player;

@Repository
public interface PlayerRepos extends JpaRepository <Player, Long>{
}
