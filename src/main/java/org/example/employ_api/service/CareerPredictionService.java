package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CareerPredictionService {

    private final GraduateInfoRepository graduateInfoRepository;

    public Map<String, Double> predictGraduateSchool(User user) {
        List<GraduateInfo> similarGraduates = graduateInfoRepository.findByMajor(user.getMajor())
                .stream()
                .filter(g -> "考研".equals(g.getCareerPath()))
                .filter(g -> Math.abs(g.getGpa() - user.getGpa()) <= 0.5)
                .collect(Collectors.toList());

        // 统计录取学校及其概率
        Map<String, Integer> schoolCounts = new HashMap<>();
        similarGraduates.forEach(g -> {
            schoolCounts.merge(g.getWorkplace(), 1, Integer::sum);
        });

        // 计算每个学校的录取概率
        Map<String, Double> predictions = new HashMap<>();
        int total = similarGraduates.size();
        schoolCounts.forEach((school, count) -> {
            predictions.put(school, count.doubleValue() / total);
        });

        return predictions;
    }

    public Map<String, Double> predictOverseasUniversity(User user) {
        List<GraduateInfo> similarGraduates = graduateInfoRepository.findByMajor(user.getMajor())
                .stream()
                .filter(g -> "出国".equals(g.getCareerPath()))
                .filter(g -> Math.abs(g.getGpa() - user.getGpa()) <= 0.5)
                .collect(Collectors.toList());

        // 统计录取学校及其概率
        Map<String, Integer> schoolCounts = new HashMap<>();
        similarGraduates.forEach(g -> {
            schoolCounts.merge(g.getWorkplace(), 1, Integer::sum);
        });

        // 计算每个学校的录取概率
        Map<String, Double> predictions = new HashMap<>();
        int total = similarGraduates.size();
        schoolCounts.forEach((school, count) -> {
            predictions.put(school, count.doubleValue() / total);
        });

        return predictions;
    }
} 