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
  LinearProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { testAPI } from '../../services/api';
import { ArrowBack, ArrowForward, Send } from '@mui/icons-material';

// Holland职业兴趣测试题目
const questions = [
  // 现实型(R) - Realistic
  {
    id: 1,
    question: "你喜欢动手制作或修理物品吗？",
    category: "R",
  },
  {
    id: 2,
    question: "你对机械操作感兴趣吗？",
    category: "R",
  },
  {
    id: 3,
    question: "你喜欢户外工作吗？",
    category: "R",
  },
  {
    id: 4,
    question: "你喜欢使用工具和设备吗？",
    category: "R",
  },
  // 研究型(I) - Investigative
  {
    id: 5,
    question: "你喜欢解决复杂的问题吗？",
    category: "I",
  },
  {
    id: 6,
    question: "你对科学研究感兴趣吗？",
    category: "I",
  },
  {
    id: 7,
    question: "你喜欢分析数据吗？",
    category: "I",
  },
  {
    id: 8,
    question: "你喜欢进行实验和探索吗？",
    category: "I",
  },
  // 艺术型(A) - Artistic
  {
    id: 9,
    question: "你喜欢创作艺术作品吗？",
    category: "A",
  },
  {
    id: 10,
    question: "你对音乐或表演艺术感兴趣吗？",
    category: "A",
  },
  {
    id: 11,
    question: "你喜欢设计和创新吗？",
    category: "A",
  },
  {
    id: 12,
    question: "你喜欢表达自己的创意想法吗？",
    category: "A",
  },
  // 社会型(S) - Social
  {
    id: 13,
    question: "你喜欢帮助他人解决问题吗？",
    category: "S",
  },
  {
    id: 14,
    question: "你对教育工作感兴趣吗？",
    category: "S",
  },
  {
    id: 15,
    question: "你善于与人沟通和交流吗？",
    category: "S",
  },
  {
    id: 16,
    question: "你喜欢参与社会服务活动吗？",
    category: "S",
  },
  // 企业型(E) - Enterprising
  {
    id: 17,
    question: "你喜欢领导团队完成任务吗？",
    category: "E",
  },
  {
    id: 18,
    question: "你对商业管理感兴趣吗？",
    category: "E",
  },
  {
    id: 19,
    question: "你善于说服他人吗？",
    category: "E",
  },
  {
    id: 20,
    question: "你喜欢制定计划和目标吗？",
    category: "E",
  },
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

  const getProgress = () => {
    return (Object.keys(answers).length / questions.length) * 100;
  };

  const handleSubmit = async () => {
    setLoading(true);
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
            <Typography variant="h5" gutterBottom color="primary">
              测试结果
            </Typography>
            <Box sx={{ my: 3 }}>
              <Typography variant="h6" gutterBottom>
                你的职业兴趣类型：
              </Typography>
              {result.recommendedCareers.map((career, index) => (
                <Paper key={index} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle1" color="primary">
                    {career}
                  </Typography>
                </Paper>
              ))}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/recommendations')}
              fullWidth
              sx={{ mt: 2 }}
            >
              查看详细职业推荐
            </Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Card 
        elevation={3}
        sx={{ 
          borderRadius: 4,
          background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* 标题部分 */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography 
              variant="h4" 
              gutterBottom 
              sx={{
                fontWeight: 600,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              职业兴趣测试
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              通过本测试，我们将帮助你发现最适合的职业方向
            </Typography>
          </Box>

          {/* 进度条 */}
          <Box sx={{ mb: 4 }}>
            <LinearProgress 
              variant="determinate" 
              value={getProgress()} 
              sx={{ 
                height: 10, 
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.05)',
                '& .MuiLinearProgress-bar': {
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  borderRadius: 5,
                }
              }}
            />
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              mt: 1
            }}>
              <Typography variant="body2" color="text.secondary">
                第 {activeStep + 1} 题，共 {questions.length} 题
              </Typography>
              <Typography variant="body2" color="text.secondary">
                完成度: {Math.round(getProgress())}%
              </Typography>
            </Box>
          </Box>

          {/* 问题卡片 */}
          <Paper 
            elevation={2}
            sx={{ 
              p: 4, 
              mb: 4, 
              borderRadius: 3,
              backgroundColor: 'rgba(255,255,255,0.8)',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)'
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom
              sx={{ 
                color: '#1976d2',
                fontWeight: 500
              }}
            >
              {questions[activeStep].question}
            </Typography>
            <Box sx={{ px: 2, py: 4 }}>
              <Slider
                value={answers[questions[activeStep].id] || 3}
                onChange={(_, value) => handleAnswer(questions[activeStep].id, value)}
                step={1}
                marks={[
                  { value: 1, label: '完全不同意' },
                  { value: 2, label: '不太同意' },
                  { value: 3, label: '一般' },
                  { value: 4, label: '比较同意' },
                  { value: 5, label: '完全同意' }
                ]}
                min={1}
                max={5}
                sx={{
                  '& .MuiSlider-markLabel': {
                    fontSize: '0.875rem',
                    color: 'text.secondary'
                  },
                  '& .MuiSlider-track': {
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  },
                  '& .MuiSlider-thumb': {
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    '&:hover, &.Mui-focusVisible': {
                      boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                    }
                  }
                }}
              />
            </Box>
          </Paper>

          {/* 导航按钮 */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between',
            gap: 2
          }}>
            <Button
              variant="outlined"
              onClick={() => setActiveStep(prev => prev - 1)}
              disabled={activeStep === 0}
              startIcon={<ArrowBack />}
              sx={{
                borderRadius: 2,
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 500
              }}
            >
              上一题
            </Button>
            {activeStep === questions.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
                disabled={Object.keys(answers).length !== questions.length}
                endIcon={<Send />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)',
                  }
                }}
              >
                提交测试
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => setActiveStep(prev => prev + 1)}
                endIcon={<ArrowForward />}
                sx={{
                  borderRadius: 2,
                  px: 4,
                  py: 1.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)',
                  }
                }}
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