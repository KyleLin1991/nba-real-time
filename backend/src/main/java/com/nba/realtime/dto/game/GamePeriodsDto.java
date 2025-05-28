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
public class GamePeriodsDto {

    @Schema(name = "目前進行到第幾節(0 表示尚未開始)")
    private int current;

    @Schema(name = "比賽總共幾節")
    private int total;

    @Schema(name = "是否為本節結束", description = "判斷是否進入節與節的休息時間")
    private boolean endOfPeriod;
}
