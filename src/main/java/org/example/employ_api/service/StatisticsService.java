package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {
    private final GraduateInfoRepository graduateInfoRepository;

    public Map<String, Object> getStatistics() {
        Map<String, Object> statistics = new HashMap<>();
        
        // 获取就业去向分布
        List<Map<String, Object>> careerPathDistribution = graduateInfoRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        GraduateInfo::getCareerPath,
                        Collectors.counting()
                ))
                .entrySet().stream()
                .map(entry -> Map.of(
                        "name", entry.getKey(),
                        "value", entry.getValue()
                ))
                .collect(Collectors.toList());
        statistics.put("careerPathDistribution", careerPathDistribution);

        // 获取专业分布
        List<Map<String, Object>> majorDistribution = graduateInfoRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        GraduateInfo::getMajor,
                        Collectors.counting()
                ))
                .entrySet().stream()
                .map(entry -> Map.of(
                        "name", entry.getKey(),
                        "value", entry.getValue()
                ))
                .collect(Collectors.toList());
        statistics.put("majorDistribution", majorDistribution);

        // 获取就业趋势（示例数据）
        List<Map<String, Object>> employmentTrends = Arrays.asList(
                Map.of(
                        "year", "2019",
                        "就业率", 65,
                        "考研率", 25,
                        "出国率", 10
                ),
                Map.of(
                        "year", "2020",
                        "就业率", 60,
                        "考研率", 28,
                        "出国率", 12
                ),
                Map.of(
                        "year", "2021",
                        "就业率", 62,
                        "考研率", 27,
                        "出国率", 11
                ),
                Map.of(
                        "year", "2022",
                        "就业率", 63,
                        "考研率", 26,
                        "出国率", 11
                ),
                Map.of(
                        "year", "2023",
                        "就业率", 64,
                        "考研率", 25,
                        "出国率", 11
                )
        );
        statistics.put("employmentTrends", employmentTrends);

        return statistics;
    }

    // 可以添加更多统计方法
    public Map<String, Double> getAverageGpaByMajor() {
        return graduateInfoRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        GraduateInfo::getMajor,
                        Collectors.averagingDouble(GraduateInfo::getGpa)
                ));
    }

    public Map<String, Long> getCareerPathCount() {
        return graduateInfoRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        GraduateInfo::getCareerPath,
                        Collectors.counting()
                ));
    }
} 