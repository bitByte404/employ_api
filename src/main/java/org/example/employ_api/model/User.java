package org.example.employ_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    private String realName;
    private String studentId;
    private String phone;
    private String email;
    private String major;
    private String politicalStatus;
    private String hometown;
    private Double gpa;
    private String awards;
    
    @Column(name = "personality_type")
    private String personalityType;
    
    @Column(name = "career_interests")
    private String careerInterests;
    
    private String role = "ROLE_USER";
    private String status = "PENDING";
    
    @Column(name = "audit_comment")
    private String auditComment;
} 