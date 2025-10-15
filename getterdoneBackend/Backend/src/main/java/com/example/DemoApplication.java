package com.example;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.function.RouterFunction;
import org.springframework.web.servlet.function.RouterFunctions;
import org.springframework.web.servlet.function.ServerResponse;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

    // Serve index.html for SPA routes
    @Bean
    RouterFunction<ServerResponse> spaRouter() {
        return RouterFunctions.resources("/**", new ClassPathResource("static/"))
            .andRoute(
                req -> !req.path().startsWith("/api") && !req.path().startsWith("/tasks") && !req.path().contains("."),
                req -> ServerResponse.ok().contentType(MediaType.TEXT_HTML)
                        .body(new ClassPathResource("static/index.html"))
            );
    }
}
