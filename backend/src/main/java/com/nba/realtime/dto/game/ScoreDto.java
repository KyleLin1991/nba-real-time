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
public class ScoreDto {

    @Schema(name = "球隊該場比賽的勝敗狀態(尚未開始則為 0)")
    private int win;

    @Schema(name = "球隊該場比賽的勝敗狀態(尚未開始則為 0)")
    private int loss;

    @Schema(name = "系列賽戰績")
    private SeriesDto seriesDto;

    @Schema(name = "各節得分(尚未開始為空字串)")
    private List<String> linescore;

    @Schema(name = "總得分(尚未開打為 null)")
    private Integer points;
}
