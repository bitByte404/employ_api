package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecommendationService {
    private final UserRepository userRepository;

    public Map<String, Object> getComprehensiveRecommendations(String username) {
        try {
            log.info("Getting recommendations for user: {}", username);
            
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("用户不存在"));

            Map<String, Object> recommendations = new HashMap<>();

            // 就业方向推荐
            List<Map<String, Object>> employment = Arrays.asList(
                Map.of(
                    "position", "产品经理",
                    "company", "互联网公司",
                    "description", "基于你的专业背景和兴趣特点，产品经理是很好的职业选择。"
                ),
                Map.of(
                    "position", "数据分析师",
                    "company", "大型科技公司",
                    "description", "你的数理基础较好，对数据分析有浓厚兴趣，可以考虑数据分析师岗位。"
                ),
                Map.of(
                    "position", "项目经理",
                    "company", "IT企业",
                    "description", "你的沟通能力强，具有良好的组织协调能力，适合项目管理工作。"
                )
            );
            recommendations.put("employment", employment);

            // 考研方向推荐
            List<Map<String, Object>> graduateSchool = Arrays.asList(
                Map.of(
                    "school", "清华大学",
                    "major", "信息管理与信息系统",
                    "description", "该专业研究方向与你的兴趣匹配度高，且学校实力强劲。"
                ),
                Map.of(
                    "school", "北京大学",
                    "major", "管理科学与工程",
                    "description", "该专业跨学科特点明显，适合你的知识结构。"
                ),
                Map.of(
                    "school", "浙江大学",
                    "major", "数据科学与大数据技术",
                    "description", "结合你的专业背景，该方向具有很好的发展前景。"
                )
            );
            recommendations.put("graduateSchool", graduateSchool);

            // 出国方向推荐
            List<Map<String, Object>> overseas = Arrays.asList(
                Map.of(
                    "school", "哥伦比亚大学",
                    "major", "信息管理",
                    "description", "该校信息管理专业全球排名靠前，且地理位置优越。"
                ),
                Map.of(
                    "school", "伦敦大学学院",
                    "major", "数据科学",
                    "description", "英国顶尖学府，数据科学专业与就业市场需求匹配度高。"
                ),
                Map.of(
                    "school", "新加坡国立大学",
                    "major", "商业分析",
                    "description", "亚洲顶尖学府，课程设置合理，就业前景广阔。"
                )
            );
            recommendations.put("overseas", overseas);

            // 相似案例推荐
            List<Map<String, Object>> similarCases = Arrays.asList(
                Map.of(
                    "name", "张三",
                    "major", user.getMajor(),
                    "graduationYear", "2023",
                    "workplace", "腾讯",
                    "position", "产品经理",
                    "location", "深圳",
                    "gpa", 3.8,
                    "skills", "Python,SQL,产品设计,用户研究",
                    "experience", "在字节跳动实习3个月，负责抖音电商数据分析；在腾讯实习4个月，参与微信支付产品改进"
                ),
                Map.of(
                    "name", "李四",
                    "major", user.getMajor(),
                    "graduationYear", "2023",
                    "workplace", "阿里巴巴",
                    "position", "数据分析师",
                    "location", "杭州",
                    "gpa", 3.9,
                    "skills", "R语言,Python,机器学习,数据可视化",
                    "experience", "参与阿里巴巴数据分析实习项目，负责用户行为分析和商业策略优化"
                )
            );
            recommendations.put("similarCases", similarCases);

            return recommendations;

        } catch (Exception e) {
            log.error("Error getting recommendations for user: {}", username, e);
            throw new RuntimeException("获取推荐信息失败", e);
        }
    }
} 