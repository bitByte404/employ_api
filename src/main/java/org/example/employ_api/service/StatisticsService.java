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
        Map<String, Long> careerPathCounts = graduateInfoRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        GraduateInfo::getCareerPath,
                        Collectors.counting()
                ));
        
        List<Map<String, Object>> careerPathDistribution = careerPathCounts.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("name", entry.getKey());
                    item.put("value", entry.getValue());
                    return item;
                })
                .collect(Collectors.toList());
        
        statistics.put("careerPathDistribution", careerPathDistribution);

        // 获取专业分布
        Map<String, Long> majorCounts = graduateInfoRepository.findAll().stream()
                .collect(Collectors.groupingBy(
                        GraduateInfo::getMajor,
                        Collectors.counting()
                ));
        
        List<Map<String, Object>> majorDistribution = majorCounts.entrySet().stream()
                .map(entry -> {
                    Map<String, Object> item = new HashMap<>();
                    item.put("name", entry.getKey());
                    item.put("value", entry.getValue());
                    return item;
                })
                .collect(Collectors.toList());
        
        statistics.put("majorDistribution", majorDistribution);

        // 获取就业趋势（示例数据）
        List<Map<String, Object>> employmentTrends = Arrays.asList(
                createTrendData("2019", 65, 25, 10),
                createTrendData("2020", 60, 28, 12),
                createTrendData("2021", 62, 27, 11),
                createTrendData("2022", 63, 26, 11),
                createTrendData("2023", 64, 25, 11)
        );
        statistics.put("employmentTrends", employmentTrends);

        return statistics;
    }

    private Map<String, Object> createTrendData(String year, int employment, int graduate, int overseas) {
        Map<String, Object> data = new HashMap<>();
        data.put("year", year);
        data.put("就业率", employment);
        data.put("考研率", graduate);
        data.put("出国率", overseas);
        return data;
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