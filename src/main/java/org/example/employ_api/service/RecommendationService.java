package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.dto.GraduateInfoDto;
import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.example.employ_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {
    private final UserRepository userRepository;
    private final GraduateInfoRepository graduateInfoRepository;

    public Map<String, Object> getComprehensiveRecommendations(String username) {
        try {
            log.info("开始处理用户 {} 的推荐请求", username);
            
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("用户不存在"));
            
            log.info("找到用户信息: {}", user);

            Map<String, Object> recommendations = new HashMap<>();

            // 就业方向推荐
            List<Map<String, String>> employmentRecs = getDefaultEmploymentRecommendations();
            recommendations.put("employment", employmentRecs);
            log.info("添加就业推荐: {}", employmentRecs);

            // 考研方向推荐
            List<Map<String, String>> graduateRecs = getDefaultGraduateSchoolRecommendations();
            recommendations.put("graduateSchool", graduateRecs);
            log.info("添加考研推荐: {}", graduateRecs);

            // 出国方向推荐
            List<Map<String, String>> overseasRecs = getDefaultOverseasRecommendations();
            recommendations.put("overseas", overseasRecs);
            log.info("添加出国推荐: {}", overseasRecs);

            // 相似案例推荐
            List<GraduateInfo> similarGraduates = user.getMajor() != null ?
                    graduateInfoRepository.findByMajor(user.getMajor()) :
                    new ArrayList<>();
            
            List<GraduateInfoDto> similarCases = similarGraduates.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
            
            recommendations.put("similarCases", similarCases);
            log.info("添加相似案例: {}", similarCases);

            return recommendations;

        } catch (Exception e) {
            log.error("处理推荐请求时发生错误", e);
            throw new RuntimeException("获取推荐信息失败: " + e.getMessage(), e);
        }
    }

    private List<Map<String, String>> getDefaultEmploymentRecommendations() {
        return Arrays.asList(
            Map.of(
                "position", "产品经理",
                "company", "互联网公司",
                "description", "基于你的专业背景和兴趣特点，产品经理是很好的职业选择。"
            ),
            Map.of(
                "position", "数据分析师",
                "company", "大型科技公司",
                "description", "你的数理基础较好，对数据分析有浓厚兴趣，可以考虑数据分析师岗位。"
            )
        );
    }

    private List<Map<String, String>> getDefaultGraduateSchoolRecommendations() {
        return Arrays.asList(
            Map.of(
                "school", "清华大学",
                "major", "信息管理与信息系统",
                "description", "该专业研究方向与你的兴趣匹配度高，且学校实力强劲。"
            ),
            Map.of(
                "school", "北京大学",
                "major", "管理科学与工程",
                "description", "该专业跨学科特点明显，适合你的知识结构。"
            )
        );
    }

    private List<Map<String, String>> getDefaultOverseasRecommendations() {
        return Arrays.asList(
            Map.of(
                "school", "哥伦比亚大学",
                "major", "信息管理",
                "description", "该校信息管理专业全球排名靠前，且地理位置优越。"
            ),
            Map.of(
                "school", "伦敦大学学院",
                "major", "数据科学",
                "description", "英国顶尖学府，数据科学专业与就业市场需求匹配度高。"
            )
        );
    }

    private GraduateInfoDto convertToDto(GraduateInfo info) {
        GraduateInfoDto dto = new GraduateInfoDto();
        dto.setId(info.getId());
        dto.setName(info.getName());
        dto.setMajor(info.getMajor());
        dto.setGraduationYear(info.getGraduationYear());
        dto.setCareerPath(info.getCareerPath());
        dto.setWorkplace(info.getWorkplace());
        dto.setPosition(info.getPosition());
        dto.setLocation(info.getLocation());
        dto.setGpa(info.getGpa());
        dto.setAwards(info.getAwards());
        dto.setSkills(info.getSkills());
        dto.setExperience(info.getExperience());
        dto.setExperienceType(info.getExperienceType());
        return dto;
    }
} 