import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Slider,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { testAPI } from '../../services/api';

// Holland职业兴趣测试题目
const questions = [
  {
    id: 1,
    question: "我喜欢动手制作或修理物品",
    category: "R", // Realistic
  },
  {
    id: 2,
    question: "我喜欢研究问题并寻找解决方案",
    category: "I", // Investigative
  },
  {
    id: 3,
    question: "我喜欢创作艺术作品或表演",
    category: "A", // Artistic
  },
  // ... 更多问题
];

const CareerTest = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (activeStep < questions.length - 1) {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await testAPI.submitCareerTest({
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer: answer.toString()
        }))
      });
      setResult(response.data);
    } catch (error) {
      setError(error.response?.data?.message || '提交测试失败');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (result) {
    return (
      <Box sx={{ p: 3 }}>
        <Card>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              测试结果
            </Typography>
            <Typography variant="h6" color="primary" sx={{ my: 3 }}>
              推荐的职业方向：
            </Typography>
            {result.recommendedCareers.map((career, index) => (
              <Typography key={index} variant="body1" sx={{ mb: 1 }}>
                {index + 1}. {career}
              </Typography>
            ))}
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/recommendations')}
              sx={{ mt: 3 }}
            >
              查看详细推荐
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            职业兴趣测试
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {questions.map((_, index) => (
              <Step key={index}>
                <StepLabel></StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              {questions[activeStep].question}
            </Typography>
            <Box sx={{ px: 2, py: 3 }}>
              <Slider
                value={answers[questions[activeStep].id] || 3}
                onChange={(_, value) => handleAnswer(questions[activeStep].id, value)}
                step={1}
                marks
                min={1}
                max={5}
                valueLabelDisplay="auto"
                valueLabelFormat={value => {
                  const labels = {
                    1: '完全不同意',
                    2: '不太同意',
                    3: '一般',
                    4: '比较同意',
                    5: '完全同意'
                  };
                  return labels[value];
                }}
              />
            </Box>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              上一题
            </Button>
            {activeStep === questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
              >
                提交
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                下一题
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CareerTest; 