package org.example.employ_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "graduate_info")
public class GraduateInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String major;
    private String graduationYear;
    private String careerPath;
    private String workplace;
    private String position;
    private String location;
    
    @Column(length = 1000)
    private String experience;
    
    private String experienceType;
    private Double gpa;
    private String awards;
    private String skills;
} 