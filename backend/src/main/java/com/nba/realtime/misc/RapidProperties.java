package com.nba.realtime.misc;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * @author Kyle
 * @since 2025/5/16
 */
@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "rapidapi")
public class RapidProperties {

    private String url;
    private String host;

    @Value("${rapidapi.key}")
    private String key;
}
