package org.example.employ_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;

    // 基本信息
    private String realName;
    private String studentId;
    private String phone;
    private String email;
    
    // 个人信息
    private String major;
    private String politicalStatus;
    private String hometown;
    
    // 学业信息
    private Double gpa;
    private String awards;
    
    // 性格和职业兴趣测试结果
    private String personalityType;
    private String careerInterests;

    // 审核相关字段
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    private String auditComment;
} 