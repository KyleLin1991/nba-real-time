package com.nba.realtime.dto.players;

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
public class GameDto {

    @Schema(description = "比賽 ID")
    private int id;
}
