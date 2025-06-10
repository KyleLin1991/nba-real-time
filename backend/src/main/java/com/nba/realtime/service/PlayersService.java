package com.nba.realtime.service;

import com.nba.realtime.dto.players.PlayerStatisticsResponseDto;

/**
 * @author Kyle
 * @since 2025/5/28
 */
public interface PlayersService {

    PlayerStatisticsResponseDto getPlayerData(String gameId);
}
