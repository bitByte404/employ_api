package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.GraduateInfoDto;
import org.example.employ_api.service.GraduateInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/graduate-info")
@RequiredArgsConstructor
public class GraduateInfoController {

    private final GraduateInfoService graduateInfoService;

    @GetMapping
    public ResponseEntity<List<GraduateInfoDto>> getAllGraduateInfo() {
        return ResponseEntity.ok(graduateInfoService.getAllGraduateInfo());
    }

    @GetMapping("/search")
    public ResponseEntity<List<GraduateInfoDto>> searchGraduateInfo(
            @RequestParam(required = false) String major,
            @RequestParam(required = false) String careerPath,
            @RequestParam(required = false) String experienceType) {
        return ResponseEntity.ok(
                graduateInfoService.getGraduateInfoByFilters(major, careerPath, experienceType));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<GraduateInfoDto> createGraduateInfo(
            @RequestBody GraduateInfoDto graduateInfoDto) {
        return ResponseEntity.ok(graduateInfoService.createGraduateInfo(graduateInfoDto));
    }
} 