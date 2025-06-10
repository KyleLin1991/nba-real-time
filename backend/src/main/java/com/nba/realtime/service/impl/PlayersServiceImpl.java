package com.nba.realtime.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nba.realtime.dto.players.PlayerStatisticsDto;
import com.nba.realtime.dto.players.PlayerStatisticsResponseDto;
import com.nba.realtime.misc.RapidApiClient;
import com.nba.realtime.service.PlayersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.apachecommons.CommonsLog;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

/**
 * @author Kyle
 * @since 2025/5/28
 */
@Service
@CommonsLog
@RequiredArgsConstructor
public class PlayersServiceImpl implements PlayersService {

    private final RapidApiClient rapidApiClient;
    private final ObjectMapper objectMapper;

    @Override
    public PlayerStatisticsResponseDto getPlayerData(String gameId) {
        if (log.isDebugEnabled()) {
            JSONObject logParams = new JSONObject();
            logParams.put("gameId", gameId);

            log.debug(logParams);
        }
        try (Response response = rapidApiClient.execute("players/statistics?game=" + gameId)) {
            if (response.isSuccessful() && response.body() != null) {
                String body = response.body().string();

                return objectMapper.readValue(body, PlayerStatisticsResponseDto.class);
            }
        } catch (IOException e) {
            log.error("Failed to fetch Players for gameId: " + gameId);

            throw new RuntimeException("RapidAPI Uri players/statistics?game= request failed: " + e.getMessage(), e);
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "get players statistics Fail!!");
    }
}
