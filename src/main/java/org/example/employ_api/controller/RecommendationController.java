package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {
    private final RecommendationService recommendationService;

    @GetMapping("/similar")
    public ResponseEntity<?> getSimilarGraduates(Authentication authentication) {
        try {
            String username = authentication.getName();
            log.info("开始获取用户 {} 的推荐信息", username);
            
            Map<String, Object> recommendations = 
                recommendationService.getComprehensiveRecommendations(username);
            
            log.info("成功获取用户 {} 的推荐信息: {}", username, recommendations);
            return ResponseEntity.ok(recommendations);
            
        } catch (Exception e) {
            log.error("获取推荐信息失败", e);
            return ResponseEntity.badRequest()
                .body(Map.of(
                    "message", "获取推荐信息失败",
                    "error", e.getMessage(),
                    "details", e.getClass().getName()
                ));
        }
    }
} 