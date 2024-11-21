package org.example.employ_api.service;

import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.model.User;
import org.springframework.stereotype.Component;

@Component
public class SimilarityCalculator {

    public double calculateSimilarity(User user, GraduateInfo graduate) {
        double similarityScore = 0.0;
        
        // 专业相似度 (权重: 0.3)
        if (user.getMajor().equals(graduate.getMajor())) {
            similarityScore += 0.3;
        }
        
        // GPA相似度 (权重: 0.2)
        double gpaDiff = Math.abs(user.getGpa() - graduate.getGpa());
        similarityScore += 0.2 * (1 - Math.min(gpaDiff, 1.0));
        
        // 兴趣匹配度 (权重: 0.3)
        if (user.getCareerInterests() != null && 
            graduate.getCareerPath() != null &&
            user.getCareerInterests().toLowerCase().contains(graduate.getCareerPath().toLowerCase())) {
            similarityScore += 0.3;
        }
        
        // 技能匹配度 (权重: 0.2)
        if (graduate.getSkills() != null && user.getAwards() != null) {
            String[] graduateSkills = graduate.getSkills().toLowerCase().split(",");
            String userSkills = user.getAwards().toLowerCase();
            for (String skill : graduateSkills) {
                if (userSkills.contains(skill.trim())) {
                    similarityScore += 0.2 / graduateSkills.length;
                }
            }
        }
        
        return similarityScore;
    }
} 