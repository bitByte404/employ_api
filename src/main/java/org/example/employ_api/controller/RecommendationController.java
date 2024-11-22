package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.service.RecommendationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
@Slf4j
public class RecommendationController {
    private final RecommendationService recommendationService;

    @GetMapping("/similar")
    public ResponseEntity<?> getSimilarGraduates(Authentication authentication) {
        try {
            if (authentication == null) {
                return ResponseEntity.badRequest()
                    .body(Map.of("message", "用户未登录"));
            }
            
            log.info("Getting recommendations for user: {}", authentication.getName());
            Map<String, Object> recommendations = new HashMap<>();
            
            try {
                recommendations = recommendationService.getComprehensiveRecommendations(authentication.getName());
                return ResponseEntity.ok(recommendations);
            } catch (Exception e) {
                log.error("Error getting recommendations", e);
                // 返回默认推荐
                return ResponseEntity.ok(getDefaultRecommendations());
            }
        } catch (Exception e) {
            log.error("Error in recommendation controller", e);
            return ResponseEntity.badRequest()
                .body(Map.of("message", "获取推荐信息失败：" + e.getMessage()));
        }
    }

    private Map<String, Object> getDefaultRecommendations() {
        Map<String, Object> recommendations = new HashMap<>();
        
        // 添加默认的就业方向推荐
        recommendations.put("employment", Arrays.asList(
            Map.of(
                "position", "产品经理",
                "company", "互联网公司",
                "description", "产品经理是一个很好的职业选择。"
            ),
            Map.of(
                "position", "数据分析师",
                "company", "科技公司",
                "description", "数据分析师具有广阔的发展前景。"
            )
        ));

        // 添加默认的考研方向推荐
        recommendations.put("graduateSchool", Arrays.asList(
            Map.of(
                "school", "清华大学",
                "major", "信息管理",
                "description", "该专业研究方向广阔。"
            ),
            Map.of(
                "school", "北京大学",
                "major", "数据科学",
                "description", "该专业就业前景好。"
            )
        ));

        // 添加默认的出国方向推荐
        recommendations.put("overseas", Arrays.asList(
            Map.of(
                "school", "哥伦比亚大学",
                "major", "信息管理",
                "description", "该校排名靠前。"
            ),
            Map.of(
                "school", "伦敦大学学院",
                "major", "数据科学",
                "description", "英国顶尖学府。"
            )
        ));

        // 添加默认的相似案例
        recommendations.put("similarCases", Arrays.asList(
            Map.of(
                "name", "张三",
                "major", "信息管理",
                "graduationYear", "2023",
                "workplace", "腾讯",
                "position", "产品经理",
                "location", "深圳",
                "gpa", 3.8,
                "skills", "Python,SQL",
                "experience", "有丰富的实习经验"
            )
        ));

        return recommendations;
    }
} 