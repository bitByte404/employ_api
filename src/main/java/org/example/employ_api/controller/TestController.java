package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.dto.PersonalityTestDto;
import org.example.employ_api.service.TestService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tests")
@RequiredArgsConstructor
@Slf4j
public class TestController {

    private final TestService testService;

    @PostMapping("/personality")
    public ResponseEntity<?> submitPersonalityTest(
            @RequestBody PersonalityTestDto testDto,
            Authentication authentication) {
        try {
            log.info("Received personality test submission from user: {}", authentication.getName());
            PersonalityTestDto result = testService.processPersonalityTest(testDto, authentication.getName());
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error processing personality test", e);
            return ResponseEntity.badRequest().body(new ErrorResponse("提交测试失败：" + e.getMessage()));
        }
    }
}

class ErrorResponse {
    private String message;

    public ErrorResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
} 