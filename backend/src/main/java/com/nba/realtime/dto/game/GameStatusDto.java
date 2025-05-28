package com.nba.realtime.dto.game;

import com.fasterxml.jackson.annotation.JsonProperty;
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
public class GameStatusDto {

    @Schema(name = "比賽剩餘時間")
    private String clock;

    @Schema(name = "是否為中場休息中")
    private boolean halftime;

    @Schema(name = "狀態代碼 1 → 尚未開始 、 2 → 進行中 、 3 → 已結束")
    private int shortStatus;

    @Schema(name = "狀態文字描述")
    private String longStatus;

    @JsonProperty("short")
    public void setShortStatus(int shortStatus) {
        this.shortStatus = shortStatus;
    }

    @JsonProperty("long")
    public void setLongStatus(String longStatus) {
        this.longStatus = longStatus;
    }
}
