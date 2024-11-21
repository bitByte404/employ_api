package org.example.employ_api.dto;

import lombok.Data;
import java.util.Map;

@Data
public class GraduateStatisticsDto {
    private Map<String, Long> careerPathDistribution;  // 就业去向分布
    private Map<String, Long> majorDistribution;       // 专业分布
    private Map<String, Double> averageGpaByMajor;    // 各专业平均绩点
    private Map<String, Long> locationDistribution;    // 地域分布
    private Map<String, Long> workplaceDistribution;   // 工作单位类型分布
} 