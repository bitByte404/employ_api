package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.UserProfileDto;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserProfileService {

    private final UserRepository userRepository;

    public UserProfileDto getUserProfile(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        return convertToDto(user);
    }

    @Transactional
    public UserProfileDto updateUserProfile(String username, UserProfileDto profileDto) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        updateUserFromDto(user, profileDto);
        User savedUser = userRepository.save(user);
        return convertToDto(savedUser);
    }

    private UserProfileDto convertToDto(User user) {
        UserProfileDto dto = new UserProfileDto();
        dto.setRealName(user.getRealName());
        dto.setStudentId(user.getStudentId());
        dto.setPhone(user.getPhone());
        dto.setEmail(user.getEmail());
        dto.setMajor(user.getMajor());
        dto.setPoliticalStatus(user.getPoliticalStatus());
        dto.setHometown(user.getHometown());
        dto.setGpa(user.getGpa());
        dto.setAwards(user.getAwards());
        dto.setPersonalityType(user.getPersonalityType());
        dto.setCareerInterests(user.getCareerInterests());
        return dto;
    }

    private void updateUserFromDto(User user, UserProfileDto dto) {
        user.setRealName(dto.getRealName());
        user.setStudentId(dto.getStudentId());
        user.setPhone(dto.getPhone());
        user.setEmail(dto.getEmail());
        user.setMajor(dto.getMajor());
        user.setPoliticalStatus(dto.getPoliticalStatus());
        user.setHometown(dto.getHometown());
        user.setGpa(dto.getGpa());
        user.setAwards(dto.getAwards());
        user.setPersonalityType(dto.getPersonalityType());
        user.setCareerInterests(dto.getCareerInterests());
    }
} 