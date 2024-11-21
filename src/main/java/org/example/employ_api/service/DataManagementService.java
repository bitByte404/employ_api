package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.UserAuditDto;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DataManagementService {

    private final UserRepository userRepository;
    private final GraduateInfoRepository graduateInfoRepository;

    // 用户审核
    @Transactional
    public UserAuditDto auditUser(Long userId, String status, String comment) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        
        user.setStatus(status);
        user.setAuditComment(comment);
        User savedUser = userRepository.save(user);
        
        return convertToAuditDto(savedUser);
    }

    // 用户查询（分页）
    public Page<UserAuditDto> searchUsers(String keyword, Pageable pageable) {
        return userRepository.findByUsernameContainingOrRealNameContaining(
                keyword, keyword, pageable)
                .map(this::convertToAuditDto);
    }

    // 数据备份
    public void backupData() {
        // TODO: 实现数据备份逻辑
    }

    // 数据恢复
    public void restoreData(String backupFile) {
        // TODO: 实现数据恢复逻辑
    }

    private UserAuditDto convertToAuditDto(User user) {
        UserAuditDto dto = new UserAuditDto();
        dto.setUserId(user.getId());
        dto.setUsername(user.getUsername());
        dto.setRealName(user.getRealName());
        dto.setStudentId(user.getStudentId());
        dto.setStatus(user.getStatus());
        dto.setComment(user.getAuditComment());
        return dto;
    }
} 