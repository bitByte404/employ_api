package org.example.employ_api.service;

import lombok.RequiredArgsConstructor;
import org.example.employ_api.dto.GraduateInfoDto;
import org.example.employ_api.model.GraduateInfo;
import org.example.employ_api.model.User;
import org.example.employ_api.repository.GraduateInfoRepository;
import org.example.employ_api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RecommendationService {

    private final UserRepository userRepository;
    private final GraduateInfoRepository graduateInfoRepository;
    private final GraduateInfoService graduateInfoService;
    private final SimilarityCalculator similarityCalculator;

    public List<GraduateInfoDto> recommendByMajorAndCareerInterests(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        List<GraduateInfo> allGraduates = graduateInfoRepository.findAll();

        return allGraduates.stream()
                .map(graduate -> new GraduateWithSimilarity(graduate, 
                    similarityCalculator.calculateSimilarity(user, graduate)))
                .sorted(Comparator.comparingDouble(GraduateWithSimilarity::getSimilarity).reversed())
                .limit(5)
                .map(GraduateWithSimilarity::getGraduate)
                .map(graduateInfoService::convertToDto)
                .collect(Collectors.toList());
    }

    public List<GraduateInfoDto> predictCareerPath(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        List<GraduateInfo> similarGraduates = graduateInfoRepository.findByMajor(user.getMajor())
                .stream()
                .filter(g -> Math.abs(g.getGpa() - user.getGpa()) <= 0.5)
                .sorted(Comparator.comparingDouble(g -> Math.abs(g.getGpa() - user.getGpa())))
                .limit(5)
                .collect(Collectors.toList());

        return similarGraduates.stream()
                .map(graduateInfoService::convertToDto)
                .collect(Collectors.toList());
    }

    private static class GraduateWithSimilarity {
        private final GraduateInfo graduate;
        private final double similarity;

        public GraduateWithSimilarity(GraduateInfo graduate, double similarity) {
            this.graduate = graduate;
            this.similarity = similarity;
        }

        public GraduateInfo getGraduate() {
            return graduate;
        }

        public double getSimilarity() {
            return similarity;
        }
    }
} 