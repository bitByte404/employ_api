package org.example.employ_api.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "graduate_info")
@Data
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
    private Double gpa;
    private String awards;
    private String skills;
    private String experience;
    private String experienceType;
} 