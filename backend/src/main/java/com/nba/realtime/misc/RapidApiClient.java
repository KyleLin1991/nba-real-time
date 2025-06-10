package com.nba.realtime.misc;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * @author Kyle
 * @since 2025/5/28
 */
@Component
public class RapidApiClient {

    private final OkHttpClient httpClient;
    private final RapidProperties properties;

    public RapidApiClient(OkHttpClient httpClient, RapidProperties properties) {
        this.httpClient = httpClient;
        this.properties = properties;
    }

    public Request buildRequest(String endpoint) {
        return new Request.Builder()
                .url(properties.getUrl() + endpoint)
                .get()
                .addHeader("x-rapidapi-key", properties.getKey())
                .addHeader("x-rapidapi-host", properties.getHost())
                .build();
    }

    public Response execute(String endpoint) throws IOException {
        return httpClient.newCall(buildRequest(endpoint)).execute();
    }
}
