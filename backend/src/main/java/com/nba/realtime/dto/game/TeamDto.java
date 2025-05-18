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
public class TeamDto {

    @Schema(name = "球隊id")
    private int id;

    @Schema(name = "球隊正式名稱")
    private String name;

    @Schema(name = "簡稱")
    private String nickname;

    @Schema(name = "球隊縮寫代碼")
    private String code;

    @Schema(name = "球隊 logo 圖片 URL")
    private String logo;
}
