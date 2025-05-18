package com.nba.realtime.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * @author Kyle
 * @since 2025/5/16
 */
@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI baseOpenApi() {
        String securitySchemeName = "Bearer Authentication";

        return new OpenAPI()
                .info(new Info()
                        .title("NBA RealTime API")
                        .version("1.0")
                        .description("Spring Boot + RapidAPI NBA 接口整合的即時比賽資料 API"))
                .servers(List.of(
                        new Server()
                                .url("/")
                                .description("Server URL")
                ));

    }
}
