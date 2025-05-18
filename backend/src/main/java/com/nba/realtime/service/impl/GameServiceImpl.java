package com.nba.realtime.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.nba.realtime.dto.game.GameResponseDto;
import com.nba.realtime.misc.RapidProperties;
import com.nba.realtime.service.GameService;
import lombok.RequiredArgsConstructor;
import lombok.extern.apachecommons.CommonsLog;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

/**
 * @author Kyle
 * @since 2025/5/16
 */
@Service
@CommonsLog
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final RapidProperties rapidProperties;
    private final OkHttpClient okHttpClient;
    private final ObjectMapper objectMapper;

    @Override
    public GameResponseDto getGames(String date) {
        if (log.isDebugEnabled()) {
            JSONObject logParams = new JSONObject();
            logParams.put("date", date);

            log.debug(logParams);
        }
        Request request = new Request.Builder()
                .url(rapidProperties.getUrl() + "games?date=" + date)
                .get()
                .addHeader("x-rapidapi-key", rapidProperties.getKey())
                .addHeader("x-rapidapi-host", rapidProperties.getHost())
                .build();

        try (Response response = okHttpClient.newCall(request).execute()) {
            if (response.isSuccessful() && response.body() != null) {
                String body = response.body().string();

                return objectMapper.readValue(body, GameResponseDto.class);
            }
        } catch (IOException e) {
            log.error("Failed to fetch games for date: " + date);

            throw new RuntimeException("RapidAPI Uri games?date request failed: " + e.getMessage(), e);
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "get All Game Fail!!");
    }

    @Override
    public String getGameLives() {
        Request request = new Request.Builder()
                .url(rapidProperties.getUrl() + "games?live=all")
                .get()
                .addHeader("x-rapidapi-key", rapidProperties.getKey())
                .addHeader("x-rapidapi-host", rapidProperties.getHost())
                .build();

        try (Response response = okHttpClient.newCall(request).execute()) {
            if (response.isSuccessful() && response.body() != null) {
                String body = response.body().string();

                return body;
            }
        } catch (IOException e) {
            throw new RuntimeException("RapidAPI Uri games?live request failed: " + e.getMessage(), e);
        }
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "get Game Live Fail!!");
    }
}
