package com.scorer.demo2.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/admin/**").hasAuthority("admin")
                .requestMatchers("/Settings.html").hasAuthority("admin")
                .requestMatchers("/AddingNewTeam.html").hasAuthority("admin")
                .requestMatchers("/AddingPlayer.html").hasAuthority("admin")
                .requestMatchers("/AddingTeam.html").hasAuthority("admin")
                .requestMatchers("/HandleGoals.html").hasAuthority("admin")
                .requestMatchers("/HandleResults.html").hasAuthority("admin")
                .anyRequest().permitAll()
            )
            .formLogin(form -> form
            .loginPage("/Login.html")                // URL serving the login page
            .loginProcessingUrl("/Login")       // URL Spring handles form POST
            .usernameParameter("email")         // name of email input
            .passwordParameter("password")      // name of password input
            .defaultSuccessUrl("/Dashboard.html") // redirect after login
            .failureHandler((request, response, exception) -> {
                response.setStatus(401); // Unauthorized
                response.setContentType("application/json");
                response.getWriter().write("{\"error\": \"Invalid email or password\"}");
            })
            .permitAll()
            )    
            .logout(logout -> logout
            .logoutUrl("/logout")
            .logoutSuccessUrl("/index.html")
            .permitAll()
            );

        return http.build();
    }
}
