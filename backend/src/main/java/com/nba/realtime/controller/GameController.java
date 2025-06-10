package com.nba.realtime.controller;

import com.nba.realtime.dto.game.GameResponseDto;
import com.nba.realtime.service.GameService;
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
 * @since 2025/5/16
 */
@Tag(name = "NBA比賽", description = "NBA比賽結果")
@RestController
@RequiredArgsConstructor
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    @Operation(summary = "指定日期的全部比賽")
    @GetMapping("/{date}")
    public ResponseEntity<GameResponseDto> getGames(@PathVariable String date) {

        return ResponseEntity.status(HttpStatus.OK).body(gameService.getGames(date));
    }
}
