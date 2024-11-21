package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.dto.PersonalityTestDto;
import org.example.employ_api.dto.QuestionAnswerDto;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class TestService {
    private final UserRepository userRepository;

    @Transactional
    public PersonalityTestDto processPersonalityTest(PersonalityTestDto testDto, String username) {
        try {
            log.info("Processing personality test for user: {}", username);
            
            User user = userRepository.findByUsername(username)
                    .orElseThrow(() -> new RuntimeException("用户不存在"));

            // 统计每个维度的答案
            Map<String, Long> counts = testDto.getAnswers().stream()
                    .collect(Collectors.groupingBy(
                            QuestionAnswerDto::getAnswer,
                            Collectors.counting()
                    ));

            // 计算MBTI类型
            StringBuilder personalityType = new StringBuilder();
            personalityType.append(counts.getOrDefault("E", 0L) > counts.getOrDefault("I", 0L) ? "E" : "I");
            personalityType.append(counts.getOrDefault("S", 0L) > counts.getOrDefault("N", 0L) ? "S" : "N");
            personalityType.append(counts.getOrDefault("T", 0L) > counts.getOrDefault("F", 0L) ? "T" : "F");
            personalityType.append(counts.getOrDefault("J", 0L) > counts.getOrDefault("P", 0L) ? "J" : "P");

            String result = personalityType.toString();
            log.info("Calculated personality type: {} for user: {}", result, username);

            // 更新用户的性格类型
            user.setPersonalityType(result);
            userRepository.save(user);

            // 设置结果
            testDto.setResult(result);
            return testDto;
            
        } catch (Exception e) {
            log.error("Error processing personality test for user: {}", username, e);
            throw new RuntimeException("处理性格测试失败", e);
        }
    }

    private String getPersonalityDescription(String type) {
        return switch (type) {
            case "INTJ" -> "建筑师型人格：战略思维者，富有创新精神";
            case "INTP" -> "逻辑学家型人格：创新的思考者，追求理论完美";
            // ... 添加其他类型的描述
            default -> "未知类型";
        };
    }
} 