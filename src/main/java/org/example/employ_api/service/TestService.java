package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.PersonalityTestDto;
import org.example.employ_api.dto.CareerInterestTestDto;
import org.example.employ_api.dto.QuestionAnswerDto;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TestService {
    
    private final UserRepository userRepository;

    @Transactional
    public PersonalityTestDto processPersonalityTest(PersonalityTestDto testDto) {
        User user = userRepository.findById(testDto.getUserId())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        String personalityType = analyzePersonalityType(testDto.getAnswers());
        user.setPersonalityType(personalityType);
        userRepository.save(user);
        
        testDto.setResult(personalityType);
        return testDto;
    }

    @Transactional
    public CareerInterestTestDto processCareerInterestTest(CareerInterestTestDto testDto) {
        User user = userRepository.findById(testDto.getUserId())
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        List<String> recommendedCareers = analyzeCareerInterests(testDto.getAnswers());
        user.setCareerInterests(String.join(",", recommendedCareers));
        userRepository.save(user);
        
        testDto.setRecommendedCareers(recommendedCareers);
        return testDto;
    }

    private String analyzePersonalityType(List<QuestionAnswerDto> answers) {
        // 实现MBTI性格测试分析算法
        int[] scores = new int[4]; // E/I, S/N, T/F, J/P
        
        for (QuestionAnswerDto answer : answers) {
            // 根据问题ID和答案计算分数
            calculateMBTIScore(answer, scores);
        }
        
        return getMBTIType(scores);
    }

    private void calculateMBTIScore(QuestionAnswerDto answer, int[] scores) {
        // 根据问题类型和答案更新分数
        switch (answer.getQuestionId() / 10) {
            case 0: // E/I questions
                scores[0] += getScoreValue(answer.getAnswer());
                break;
            case 1: // S/N questions
                scores[1] += getScoreValue(answer.getAnswer());
                break;
            case 2: // T/F questions
                scores[2] += getScoreValue(answer.getAnswer());
                break;
            case 3: // J/P questions
                scores[3] += getScoreValue(answer.getAnswer());
                break;
        }
    }

    private int getScoreValue(String answer) {
        return answer.equalsIgnoreCase("A") ? 1 : -1;
    }

    private String getMBTIType(int[] scores) {
        StringBuilder type = new StringBuilder();
        type.append(scores[0] > 0 ? "E" : "I");
        type.append(scores[1] > 0 ? "S" : "N");
        type.append(scores[2] > 0 ? "T" : "F");
        type.append(scores[3] > 0 ? "J" : "P");
        return type.toString();
    }

    private List<String> analyzeCareerInterests(List<QuestionAnswerDto> answers) {
        // 实现Holland职业兴趣理论分析
        int[] hollandScores = new int[6]; // RIASEC模型的六个维度
        
        for (QuestionAnswerDto answer : answers) {
            calculateHollandScore(answer, hollandScores);
        }
        
        return getRecommendedCareers(hollandScores);
    }

    private void calculateHollandScore(QuestionAnswerDto answer, int[] scores) {
        // 根据问题类型和答案更新RIASEC分数
        int category = answer.getQuestionId() % 6;
        scores[category] += Integer.parseInt(answer.getAnswer()); // 假设答案是1-5的分数
    }

    private List<String> getRecommendedCareers(int[] scores) {
        // 根据RIASEC分数推荐职业
        // 这里简化处理，实际应该有更复杂的匹配算法
        if (scores[0] > scores[1] && scores[0] > scores[2]) { // Realistic
            return Arrays.asList("工程师", "技术员", "机械维修");
        } else if (scores[1] > scores[2]) { // Investigative
            return Arrays.asList("研究员", "数据分析师", "科学家");
        } else { // Artistic
            return Arrays.asList("设计师", "艺术家", "作家");
        }
    }
} 