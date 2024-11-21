package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.GraduateInfoDto;
import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GraduateInfoService {

    private final GraduateInfoRepository graduateInfoRepository;

    public List<GraduateInfoDto> getAllGraduateInfo() {
        return graduateInfoRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GraduateInfoDto> getGraduateInfoByFilters(
            String major, String careerPath, String experienceType) {
        return graduateInfoRepository.findByFilters(major, careerPath, experienceType)
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public GraduateInfoDto createGraduateInfo(GraduateInfoDto dto) {
        GraduateInfo info = convertToEntity(dto);
        GraduateInfo saved = graduateInfoRepository.save(info);
        return convertToDto(saved);
    }

    public GraduateInfoDto convertToDto(GraduateInfo info) {
        GraduateInfoDto dto = new GraduateInfoDto();
        dto.setId(info.getId());
        dto.setName(info.getName());
        dto.setMajor(info.getMajor());
        dto.setGraduationYear(info.getGraduationYear());
        dto.setCareerPath(info.getCareerPath());
        dto.setWorkplace(info.getWorkplace());
        dto.setPosition(info.getPosition());
        dto.setLocation(info.getLocation());
        dto.setExperience(info.getExperience());
        dto.setExperienceType(info.getExperienceType());
        dto.setGpa(info.getGpa());
        dto.setAwards(info.getAwards());
        dto.setSkills(info.getSkills());
        return dto;
    }

    private GraduateInfo convertToEntity(GraduateInfoDto dto) {
        GraduateInfo info = new GraduateInfo();
        info.setName(dto.getName());
        info.setMajor(dto.getMajor());
        info.setGraduationYear(dto.getGraduationYear());
        info.setCareerPath(dto.getCareerPath());
        info.setWorkplace(dto.getWorkplace());
        info.setPosition(dto.getPosition());
        info.setLocation(dto.getLocation());
        info.setExperience(dto.getExperience());
        info.setExperienceType(dto.getExperienceType());
        info.setGpa(dto.getGpa());
        info.setAwards(dto.getAwards());
        info.setSkills(dto.getSkills());
        return info;
    }
} 