package org.example.employ_api.controller;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.UserAuditDto;
import org.example.employ_api.service.DataManagementService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/management")
@PreAuthorize("hasRole('ADMIN')")
@RequiredArgsConstructor
public class DataManagementController {

    private final DataManagementService dataManagementService;

    @PutMapping("/users/{userId}/audit")
    public ResponseEntity<UserAuditDto> auditUser(
            @PathVariable Long userId,
            @RequestParam String status,
            @RequestParam(required = false) String comment) {
        return ResponseEntity.ok(dataManagementService.auditUser(userId, status, comment));
    }

    @GetMapping("/users/search")
    public ResponseEntity<Page<UserAuditDto>> searchUsers(
            @RequestParam(required = false) String keyword,
            Pageable pageable) {
        return ResponseEntity.ok(dataManagementService.searchUsers(keyword, pageable));
    }

    @PostMapping("/backup")
    public ResponseEntity<?> backupData() {
        dataManagementService.backupData();
        return ResponseEntity.ok("数据备份成功");
    }

    @PostMapping("/restore")
    public ResponseEntity<?> restoreData(@RequestParam String backupFile) {
        dataManagementService.restoreData(backupFile);
        return ResponseEntity.ok("数据恢复成功");
    }
} 