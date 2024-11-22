package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.GraduateInfoDto;
import org.example.employ_api.service.GraduateInfoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/graduates")
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
            graduateInfoService.getGraduateInfoByFilters(major, careerPath, experienceType)
        );
    }

    @PostMapping
    public ResponseEntity<GraduateInfoDto> createGraduateInfo(
            @RequestBody GraduateInfoDto graduateInfoDto) {
        return ResponseEntity.ok(graduateInfoService.createGraduateInfo(graduateInfoDto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<GraduateInfoDto> updateGraduateInfo(
            @PathVariable Long id,
            @RequestBody GraduateInfoDto graduateInfoDto) {
        return ResponseEntity.ok(graduateInfoService.updateGraduateInfo(id, graduateInfoDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGraduateInfo(@PathVariable Long id) {
        graduateInfoService.deleteGraduateInfo(id);
        return ResponseEntity.ok().build();
    }
} 