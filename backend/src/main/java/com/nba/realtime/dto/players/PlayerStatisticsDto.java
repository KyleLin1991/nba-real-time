package com.nba.realtime.dto.players;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.nba.realtime.dto.game.TeamDto;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Kyle
 * @since 2025/5/29
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PlayerStatisticsDto {

    @Schema(description = "球員基本資料")
    private PlayerDto player;

    @Schema(description = "所屬球隊資料")
    private TeamDto team;

    @Schema(description = "gameId")
    private GameDto game;

    @Schema(description = "得分")
    private int points;

    @Schema(description = "球員位置（可能為 null）")
    private String pos;

    @Schema(description = "上場時間（分鐘）")
    private String min;

    @Schema(description = "投籃命中數")
    private int fgm;

    @Schema(description = "投籃出手數")
    private int fga;

    @Schema(description = "投籃命中率（%）")
    private String fgp;

    @Schema(description = "罰球命中數")
    private int ftm;

    @Schema(description = "罰球出手數")
    private int fta;

    @Schema(description = "罰球命中率（%）")
    private String ftp;

    @Schema(description = "三分球命中數")
    private int tpm;

    @Schema(description = "三分球出手數")
    private int tpa;

    @Schema(description = "三分球命中率（%）")
    private String tpp;

    @Schema(description = "進攻籃板數")
    private int offReb;

    @Schema(description = "防守籃板數")
    private int defReb;

    @Schema(description = "總籃板數")
    private int totReb;

    @Schema(description = "助攻數")
    private int assists;

    @Schema(description = "犯規數")
    @JsonProperty("pFouls")
    private int pFouls;

    @Schema(description = "抄截數")
    private int steals;

    @Schema(description = "失誤數")
    private int turnovers;

    @Schema(description = "阻攻數")
    private int blocks;

    @Schema(description = "場上正負值")
    private String plusMinus;

    @Schema(description = "備註（通常為 null）")
    private String comment;
}
