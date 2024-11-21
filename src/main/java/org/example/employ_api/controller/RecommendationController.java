package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.GraduateInfoDto;
import org.example.employ_api.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final RecommendationService recommendationService;

    @GetMapping("/similar")
    public ResponseEntity<List<GraduateInfoDto>> getSimilarGraduates(Authentication authentication) {
        List<GraduateInfoDto> recommendations = 
            recommendationService.recommendByMajorAndCareerInterests(authentication.getName());
        return ResponseEntity.ok(recommendations);
    }

    @GetMapping("/career-prediction")
    public ResponseEntity<List<GraduateInfoDto>> getCareerPrediction(Authentication authentication) {
        List<GraduateInfoDto> predictions = 
            recommendationService.predictCareerPath(authentication.getName());
        return ResponseEntity.ok(predictions);
    }
} 