package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.example.employ_api.service.CareerPredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/predictions")
@RequiredArgsConstructor
public class CareerPredictionController {

    private final CareerPredictionService predictionService;
    private final UserRepository userRepository;

    @GetMapping("/graduate-school")
    public ResponseEntity<Map<String, Double>> predictGraduateSchool(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return ResponseEntity.ok(predictionService.predictGraduateSchool(user));
    }

    @GetMapping("/overseas")
    public ResponseEntity<Map<String, Double>> predictOverseasUniversity(Authentication authentication) {
        User user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return ResponseEntity.ok(predictionService.predictOverseasUniversity(user));
    }
} 