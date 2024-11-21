package org.example.employ_api.dto;

import lombok.Data;

@Data
public class UserProfileDto {
    private String realName;
    private String studentId;
    private String phone;
    private String email;
    private String major;
    private String politicalStatus;
    private String hometown;
    private Double gpa;
    private String awards;
    private String personalityType;
    private String careerInterests;
} 