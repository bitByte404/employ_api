package org.example.employ_api.repository;

import org.example.employ_api.model.GraduateInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GraduateInfoRepository extends JpaRepository<GraduateInfo, Long> {
    List<GraduateInfo> findByMajor(String major);
    List<GraduateInfo> findByCareerPath(String careerPath);
    
    @Query("SELECT g FROM GraduateInfo g WHERE " +
           "(:major IS NULL OR g.major = :major) AND " +
           "(:careerPath IS NULL OR g.careerPath = :careerPath) AND " +
           "(:experienceType IS NULL OR g.experienceType = :experienceType)")
    List<GraduateInfo> findByFilters(
            @Param("major") String major,
            @Param("careerPath") String careerPath,
            @Param("experienceType") String experienceType);
} 