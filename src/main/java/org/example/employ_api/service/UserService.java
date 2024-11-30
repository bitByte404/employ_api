package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.example.employ_api.dto.UserRegistrationDto;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(UserRegistrationDto registrationDto) {
        try {
            log.info("开始注册用户: {}", registrationDto.getUsername());
            
            if (userRepository.existsByUsername(registrationDto.getUsername())) {
                log.warn("用户名已存在: {}", registrationDto.getUsername());
                throw new RuntimeException("用户名已存在");
            }

            User user = new User();
            user.setUsername(registrationDto.getUsername());
            user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
            user.setRealName(registrationDto.getRealName());
            user.setStudentId(registrationDto.getStudentId());
            user.setPhone(registrationDto.getPhone());
            user.setEmail(registrationDto.getEmail());
            user.setRole("ROLE_USER");
            user.setStatus("ACTIVE");

            User savedUser = userRepository.save(user);
            log.info("用户注册成功: {}", savedUser.getUsername());
            return savedUser;
        } catch (Exception e) {
            log.error("用户注册失败: {}", e.getMessage(), e);
            throw new RuntimeException("注册失败：" + e.getMessage());
        }
    }
} 