package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.GraduateStatisticsDto;
import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatisticsService {

    private final GraduateInfoRepository graduateInfoRepository;

    public GraduateStatisticsDto getGraduateStatistics() {
        List<GraduateInfo> allGraduates = graduateInfoRepository.findAll();
        GraduateStatisticsDto statistics = new GraduateStatisticsDto();

        // 计算就业去向分布
        statistics.setCareerPathDistribution(
            allGraduates.stream()
                .collect(Collectors.groupingBy(
                    GraduateInfo::getCareerPath,
                    Collectors.counting()
                ))
        );

        // 计算专业分布
        statistics.setMajorDistribution(
            allGraduates.stream()
                .collect(Collectors.groupingBy(
                    GraduateInfo::getMajor,
                    Collectors.counting()
                ))
        );

        // 计算各专业平均绩点
        statistics.setAverageGpaByMajor(
            allGraduates.stream()
                .collect(Collectors.groupingBy(
                    GraduateInfo::getMajor,
                    Collectors.averagingDouble(GraduateInfo::getGpa)
                ))
        );

        // 计算地域分布
        statistics.setLocationDistribution(
            allGraduates.stream()
                .collect(Collectors.groupingBy(
                    GraduateInfo::getLocation,
                    Collectors.counting()
                ))
        );

        // 计算工作单位类型分布
        statistics.setWorkplaceDistribution(
            allGraduates.stream()
                .collect(Collectors.groupingBy(
                    GraduateInfo::getWorkplace,
                    Collectors.counting()
                ))
        );

        return statistics;
    }
} 