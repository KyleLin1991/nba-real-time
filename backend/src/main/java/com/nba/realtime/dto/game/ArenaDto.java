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
public class ArenaDto {

    @Schema(name = "球館名稱")
    private String name;

    @Schema(name = "所在城市")
    private String city;

    @Schema(name = "所在州")
    private String state;

    @Schema(name = "國家(通常為 null，代表美國)")
    private String country;
}
