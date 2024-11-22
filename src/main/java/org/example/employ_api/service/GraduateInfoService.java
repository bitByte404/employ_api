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

    @Transactional(readOnly = true)
    public List<GraduateInfoDto> getAllGraduateInfo() {
        return graduateInfoRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
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
        GraduateInfo savedInfo = graduateInfoRepository.save(info);
        return convertToDto(savedInfo);
    }

    @Transactional
    public GraduateInfoDto updateGraduateInfo(Long id, GraduateInfoDto dto) {
        GraduateInfo info = graduateInfoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("毕业生信息不存在"));
        
        updateEntityFromDto(info, dto);
        GraduateInfo updatedInfo = graduateInfoRepository.save(info);
        return convertToDto(updatedInfo);
    }

    @Transactional
    public void deleteGraduateInfo(Long id) {
        graduateInfoRepository.deleteById(id);
    }

    private GraduateInfoDto convertToDto(GraduateInfo info) {
        GraduateInfoDto dto = new GraduateInfoDto();
        dto.setId(info.getId());
        dto.setName(info.getName());
        dto.setMajor(info.getMajor());
        dto.setGraduationYear(info.getGraduationYear());
        dto.setCareerPath(info.getCareerPath());
        dto.setWorkplace(info.getWorkplace());
        dto.setPosition(info.getPosition());
        dto.setLocation(info.getLocation());
        dto.setGpa(info.getGpa());
        dto.setAwards(info.getAwards());
        dto.setSkills(info.getSkills());
        dto.setExperience(info.getExperience());
        dto.setExperienceType(info.getExperienceType());
        return dto;
    }

    private GraduateInfo convertToEntity(GraduateInfoDto dto) {
        GraduateInfo info = new GraduateInfo();
        updateEntityFromDto(info, dto);
        return info;
    }

    private void updateEntityFromDto(GraduateInfo info, GraduateInfoDto dto) {
        info.setName(dto.getName());
        info.setMajor(dto.getMajor());
        info.setGraduationYear(dto.getGraduationYear());
        info.setCareerPath(dto.getCareerPath());
        info.setWorkplace(dto.getWorkplace());
        info.setPosition(dto.getPosition());
        info.setLocation(dto.getLocation());
        info.setGpa(dto.getGpa());
        info.setAwards(dto.getAwards());
        info.setSkills(dto.getSkills());
        info.setExperience(dto.getExperience());
        info.setExperienceType(dto.getExperienceType());
    }
} 