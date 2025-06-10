package com.nba.realtime.config;

import com.nba.realtime.misc.RapidApiClient;
import com.nba.realtime.misc.RapidProperties;
import okhttp3.OkHttpClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author Kyle
 * @since 2025/5/16
 */
@Configuration
public class RapidApiConfig {

    @Bean
    public OkHttpClient okHttpClient() {
        return new OkHttpClient.Builder().build();
    }

    @Bean
    public RapidApiClient rapidApiClient(OkHttpClient okHttpClient, RapidProperties rapidProperties) {
        return new RapidApiClient(okHttpClient, rapidProperties);
    }
}
