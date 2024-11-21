package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.UserRegistrationDto;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(UserRegistrationDto registrationDto) {
        if (userRepository.existsByUsername(registrationDto.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }

        User user = new User();
        user.setUsername(registrationDto.getUsername());
        user.setPassword(passwordEncoder.encode(registrationDto.getPassword()));
        user.setRole("ROLE_USER");
        user.setRealName(registrationDto.getRealName());
        user.setStudentId(registrationDto.getStudentId());
        user.setPhone(registrationDto.getPhone());
        user.setEmail(registrationDto.getEmail());

        return userRepository.save(user);
    }
} 