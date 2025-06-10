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
public class PlayerDto {

    @Schema(description = "球員 ID")
    private int id;

    @Schema(description = "名字")
    private String firstname;

    @Schema(description = "姓氏")
    private String lastname;
}
