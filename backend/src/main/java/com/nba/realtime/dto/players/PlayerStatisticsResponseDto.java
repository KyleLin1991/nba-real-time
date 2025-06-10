package com.nba.realtime.dto.players;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Kyle
 * @since 2025/5/29
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerStatisticsResponseDto {

    @Schema(name = "球員數量")
    private int results;

    private List<PlayerStatisticsDto> response;
}
