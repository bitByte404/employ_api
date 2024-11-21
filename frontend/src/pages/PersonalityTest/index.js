import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { testAPI } from '../../services/api';

// MBTI测试题目
const questions = [
  // E vs I (外向 vs 内向) - 8题
  {
    id: 1,
    question: "在社交场合中，你通常会：",
    options: [
      { value: "E", label: "A. 主动与他人交谈，享受社交" },
      { value: "I", label: "B. 倾向于安静观察，选择性社交" }
    ]
  },
  {
    id: 2,
    question: "在团队工作中，你更倾向于：",
    options: [
      { value: "E", label: "A. 积极参与讨论，分享想法" },
      { value: "I", label: "B. 先思考后发言，更多倾听" }
    ]
  },
  {
    id: 3,
    question: "休息时，你更喜欢：",
    options: [
      { value: "E", label: "A. 和朋友一起外出活动" },
      { value: "I", label: "B. 独自在家看书或放松" }
    ]
  },
  {
    id: 4,
    question: "遇到问题时，你倾向于：",
    options: [
      { value: "E", label: "A. 和他人讨论寻求解决方案" },
      { value: "I", label: "B. 独自思考分析问题" }
    ]
  },
  {
    id: 5,
    question: "在新环境中，你通常会：",
    options: [
      { value: "E", label: "A. 快速适应并结交新朋友" },
      { value: "I", label: "B. 需要时间慢慢适应" }
    ]
  },
  // S vs N (感觉 vs 直觉) - 8题
  {
    id: 6,
    question: "在学习新知识时，你更注重：",
    options: [
      { value: "S", label: "A. 具体的事实和细节" },
      { value: "N", label: "B. 概念和理论" }
    ]
  },
  {
    id: 7,
    question: "在解决问题时，你更依赖：",
    options: [
      { value: "S", label: "A. 过去的经验和已知事实" },
      { value: "N", label: "B. 直觉和可能性" }
    ]
  },
  {
    id: 8,
    question: "你更关注：",
    options: [
      { value: "S", label: "A. 当下的现实情况" },
      { value: "N", label: "B. 未来的可能性" }
    ]
  },
  // T vs F (思考 vs 情感) - 8题
  {
    id: 9,
    question: "做决定时，你更看重：",
    options: [
      { value: "T", label: "A. 逻辑和客观分析" },
      { value: "F", label: "B. 个人价值观和感受" }
    ]
  },
  {
    id: 10,
    question: "在处理冲突时，你更倾向于：",
    options: [
      { value: "T", label: "A. 分析问题，寻找最合理的解决方案" },
      { value: "F", label: "B. 考虑各方感受，寻求和谐" }
    ]
  },
  // J vs P (判断 vs 知觉) - 8题
  {
    id: 11,
    question: "对待工作/学习计划，你更喜欢：",
    options: [
      { value: "J", label: "A. 制定详细计划并严格执行" },
      { value: "P", label: "B. 保持灵活，随机应变" }
    ]
  },
  {
    id: 12,
    question: "面对截止日期，你通常会：",
    options: [
      { value: "J", label: "A. 提前完成任务" },
      { value: "P", label: "B. 在最后期限前完成" }
    ]
  },
  // ... 继续添加更多题目
];

const PersonalityTest = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);
  const [activeStep, setActiveStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
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
      const response = await testAPI.submitPersonalityTest({
        answers: Object.entries(answers).map(([questionId, answer]) => ({
          questionId: parseInt(questionId),
          answer
        }))
      });
      
      if (response.data.result) {
        setResult(response.data);
      } else {
        throw new Error('未获取到测试结果');
      }
    } catch (error) {
      console.error('提交测试失败:', error);
      setError(error.response?.data?.message || '提交测试失败，请稍后重试');
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
            <Typography variant="h4" color="primary" sx={{ my: 3 }}>
              你的性格类型是：{result.result}
            </Typography>
            <Typography paragraph>
              {/* 根据不同性格类型显示详细解释 */}
              {getPersonalityDescription(result.result)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/recommendations')}
              sx={{ mt: 2 }}
            >
              查看个性化推荐
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
            MBTI性格测试
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
            <RadioGroup
              value={answers[questions[activeStep].id] || ''}
              onChange={(e) => handleAnswer(questions[activeStep].id, e.target.value)}
            >
              {questions[activeStep].options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{ mb: 1 }}
                />
              ))}
            </RadioGroup>
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
                disabled={!answers[questions[activeStep].id]}
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

// 性格类型描述
const getPersonalityDescription = (type) => {
  const descriptions = {
    'INTJ': `INTJ型人格（建筑师）：
    - 战略性思考者，善于规划和创新
    - 独立自主，追求完美
    - 适合的职业：战略分析师、科研人员、系统架构师、投资分析师
    - 发展建议：加强沟通技巧，培养同理心`,
    'INTP': `INTP型人格（逻辑学家）：
    - 创新的问题解决者，追求逻辑和理性
    - 好奇心强，喜欢探索理论可能性
    - 适合的职业：软件工程师、数据科学家、研究员、大学教授
    - 发展建议：提高执行力，加强实践能力`,
    // ... 添加其他类型的详细描述
  };
  return descriptions[type] || '暂无详细描述';
};

export default PersonalityTest; 