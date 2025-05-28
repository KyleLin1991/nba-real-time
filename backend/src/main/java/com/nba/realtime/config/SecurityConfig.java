package com.nba.realtime.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;
import java.util.List;

/**
 * @author Kyle
 * @since 2025/5/27
 */
@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    @Value("${security.ignore-security-check-uri-list}")
    private String[] AUTH_WHITELIST;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .cors(Customizer.withDefaults()) // 啟用 CORS
                .csrf(AbstractHttpConfigurer::disable)
                // 無狀態不需要session
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers(AUTH_WHITELIST)
                        .permitAll()
                        .anyRequest().denyAll())
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // 1.允許任何來源
        configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
        // 2.允許任何請求頭
        configuration.addAllowedHeader(CorsConfiguration.ALL);
        // 3.允許任何方法
        configuration.addAllowedMethod(CorsConfiguration.ALL);
        // 4.允許憑證
        configuration.setAllowCredentials(true);
        // 5.允許對外曝光的請求頭
        configuration.setExposedHeaders(List.of("Authorization"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }
}
