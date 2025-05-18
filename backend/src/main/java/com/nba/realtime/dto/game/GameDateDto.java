package com.nba.realtime.dto.game;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Kyle
 * @since 2025/5/16
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDateDto {

    @Schema(name = "比賽 UTC 開始時間")
    private String start;

    @Schema(name = "比賽結束時間")
    private String end;

    @Schema(name = "比賽總時長")
    private String duration;
}
