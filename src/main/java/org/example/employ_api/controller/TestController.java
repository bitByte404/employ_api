package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.PersonalityTestDto;
import org.example.employ_api.dto.CareerInterestTestDto;
import org.example.employ_api.service.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    @PostMapping("/personality")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<PersonalityTestDto> submitPersonalityTest(
            @RequestBody PersonalityTestDto testDto) {
        return ResponseEntity.ok(testService.processPersonalityTest(testDto));
    }

    @PostMapping("/career-interest")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<CareerInterestTestDto> submitCareerInterestTest(
            @RequestBody CareerInterestTestDto testDto) {
        return ResponseEntity.ok(testService.processCareerInterestTest(testDto));
    }
} 