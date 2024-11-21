package org.example.employ_api.dto;

import lombok.Data;
import java.util.List;

@Data
public class CareerInterestTestDto {
    private Long userId;
    private List<QuestionAnswerDto> answers;
    private List<String> recommendedCareers;
} 