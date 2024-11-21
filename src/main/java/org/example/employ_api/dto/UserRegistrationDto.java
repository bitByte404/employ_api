package org.example.employ_api.dto;

import lombok.Data;

@Data
public class UserRegistrationDto {
    private String username;
    private String password;
    private String realName;
    private String studentId;
    private String phone;
    private String email;
} 