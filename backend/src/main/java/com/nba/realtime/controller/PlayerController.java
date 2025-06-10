package com.nba.realtime.controller;

import com.nba.realtime.dto.players.PlayerStatisticsResponseDto;
import com.nba.realtime.service.PlayersService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Kyle
 * @since 2025/5/28
 */
@Tag(name = "NBA球員", description = "NBA球員數據")
@RestController
@RequiredArgsConstructor
@RequestMapping("/players")
public class PlayerController {

    private final PlayersService playersService;

    @Operation(summary = "球員當日比賽數據")
    @GetMapping("/statistics/{gameId}")
    public ResponseEntity<PlayerStatisticsResponseDto> getPlayerData(@PathVariable String gameId) {

        return ResponseEntity.status(HttpStatus.OK).body(playersService.getPlayerData(gameId));
    }
}
