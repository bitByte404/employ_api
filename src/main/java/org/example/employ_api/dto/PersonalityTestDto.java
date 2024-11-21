package org.example.employ_api.dto;

import lombok.Data;
import java.util.List;

@Data
public class PersonalityTestDto {
    private Long userId;
    private List<QuestionAnswerDto> answers;
    private String result;
} 