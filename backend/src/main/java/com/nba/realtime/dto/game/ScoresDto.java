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
public class ScoresDto {

    @Schema(name = "客隊")
    private ScoreDto visitors;

    @Schema(name = "主隊")
    private ScoreDto home;
}
