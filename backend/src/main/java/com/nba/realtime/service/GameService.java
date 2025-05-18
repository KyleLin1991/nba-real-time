package com.nba.realtime.service;

import com.nba.realtime.dto.game.GameResponseDto;

/**
 * @author Kyle
 * @since 2025/5/16
 */
public interface GameService {

    GameResponseDto getGames(String date);
    String getGameLives();
}
