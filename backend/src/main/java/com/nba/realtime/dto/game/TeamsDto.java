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
public class TeamsDto {

    @Schema(name = "客隊")
    private TeamDto visitors;

    @Schema(name = "主隊")
    private TeamDto home;
}
