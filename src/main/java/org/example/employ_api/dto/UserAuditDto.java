package org.example.employ_api.dto;

import lombok.Data;

@Data
public class UserAuditDto {
    private Long userId;
    private String username;
    private String realName;
    private String studentId;
    private String status;  // PENDING, APPROVED, REJECTED
    private String comment; // 审核意见
} 