package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.UserProfileDto;
import org.example.employ_api.service.UserProfileService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserProfileService userProfileService;

    @GetMapping
    public ResponseEntity<UserProfileDto> getUserProfile(Authentication authentication) {
        UserProfileDto profile = userProfileService.getUserProfile(authentication.getName());
        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<UserProfileDto> updateUserProfile(
            Authentication authentication,
            @RequestBody UserProfileDto profileDto) {
        UserProfileDto updatedProfile = userProfileService.updateUserProfile(
                authentication.getName(), profileDto);
        return ResponseEntity.ok(updatedProfile);
    }
} 