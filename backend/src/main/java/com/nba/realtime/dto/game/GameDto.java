package com.nba.realtime.dto.game;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author Kyle
 * @since 2025/5/16
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDto {

    @Schema(name = "比賽id")
    private int id;

    @Schema(name = "聯盟類型(通常是 standard)")
    private String league;

    @Schema(name = "球季年份")
    private int season;

    private GameDateDto date;

    @Schema(name = "比賽所屬階段")
    private int stage;

    private GameStatusDto status;
    private GamePeriodsDto periods;
    private ArenaDto arenaDto;
    private TeamsDto teamsDto;
    private ScoresDto scoresDto;

    @Schema(name = "裁判清單")
    private List<String> officials;

    @Schema(name = "雙方平手次數(比賽後才有)")
    private Integer timesTied;

    @Schema(name = "領先變更次數")
    private Integer leadChanges;

    @Schema(name = "額外說明文字(可能是亮點、分析等)")
    private String nugget;
}
