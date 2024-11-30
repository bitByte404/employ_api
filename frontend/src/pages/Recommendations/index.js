import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Avatar,
  Divider,
  Button,
} from '@mui/material';
import {
  Work,
  School,
  Flight,
  LocationOn,
  Grade,
  EmojiEvents,
  Timeline,
  WorkspacePremium,
} from '@mui/icons-material';
import { recommendationAPI } from '../../services/api';
import { userAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileComplete, setProfileComplete] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRecommendations();
    checkProfileCompleteness();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('请先登录');
      }

      const response = await recommendationAPI.getSimilar();
      if (response.data) {
        setRecommendations(response.data);
      } else {
        throw new Error('获取数据失败');
      }
    } catch (err) {
      console.error('获取推荐信息失败:', err);
      setError(err.response?.data?.message || err.message || '获取推荐信息失败');
    } finally {
      setLoading(false);
    }
  };

  const checkProfileCompleteness = async () => {
    try {
      const response = await userAPI.getProfile();
      const profile = response.data;
      
      // 检查必要字段是否都已填写
      const requiredFields = [
        'realName',
        'studentId',
        'major',
        'politicalStatus',
        'hometown',
        'gpa',
        'phone',
        'email',
        'personalityType',
        'careerInterests'
      ];
      
      const isComplete = requiredFields.every(field => 
        profile[field] !== null && profile[field] !== undefined && profile[field] !== ''
      );
      
      setProfileComplete(isComplete);
    } catch (error) {
      console.error('获取用户信息失败:', error);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {!profileComplete && (
        <Alert 
          severity="warning" 
          sx={{ mb: 3 }}
          action={
            <Button 
              color="inherit" 
              size="small" 
              onClick={() => navigate('/profile')}
            >
              完善信息
            </Button>
          }
        >
          您的个人信息尚未完善，当前推荐结果可能不够准确。建议您完善个人信息以获得更精准的推荐。
        </Alert>
      )}

      {/* 标题部分 */}
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mb: 3, 
          borderRadius: 4,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
        }}
      >
        <Typography variant="h4" gutterBottom>
          个性化推荐
        </Typography>
        <Typography variant="subtitle1">
          基于你的专业、兴趣和测试结果，为你推荐以下发展方向和参考案例
        </Typography>
      </Paper>

      <Grid container spacing={3}>
        {/* 就业方向 */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                  <Work />
                </Avatar>
                <Typography variant="h5">就业方向</Typography>
              </Box>
              <Grid container spacing={2}>
                {recommendations?.employment?.map((item, index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <Paper 
                      sx={{ 
                        p: 3, 
                        height: '100%',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <Typography variant="h6" color="primary" gutterBottom>
                        {item.position}
                      </Typography>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {item.company}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 考研方向 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'secondary.main', mr: 2 }}>
                  <School />
                </Avatar>
                <Typography variant="h5">考研方向</Typography>
              </Box>
              {recommendations?.graduateSchool?.map((item, index) => (
                <Paper 
                  key={index}
                  sx={{ 
                    p: 3, 
                    mb: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    {item.school}
                  </Typography>
                  <Chip 
                    label={item.major}
                    color="primary"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* 出国方向 */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 4, height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'info.main', mr: 2 }}>
                  <Flight />
                </Avatar>
                <Typography variant="h5">出国方向</Typography>
              </Box>
              {recommendations?.overseas?.map((item, index) => (
                <Paper 
                  key={index}
                  sx={{ 
                    p: 3, 
                    mb: 2,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                    }
                  }}
                >
                  <Typography variant="h6" color="primary" gutterBottom>
                    {item.school}
                  </Typography>
                  <Chip 
                    label={item.major}
                    color="info"
                    variant="outlined"
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </Paper>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* 相似案例 */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 4, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                  <WorkspacePremium />
                </Avatar>
                <Typography variant="h5">相似案例推荐</Typography>
              </Box>
              <Grid container spacing={3}>
                {recommendations?.similarCases?.map((graduate, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper 
                      sx={{ 
                        p: 3,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                          {graduate.name?.[0]}
                        </Avatar>
                        <Box>
                          <Typography variant="h6">{graduate.name}</Typography>
                          <Typography variant="subtitle2" color="text.secondary">
                            {graduate.major} | {graduate.graduationYear}
                          </Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 2 }} />
                      <Box sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Work sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                          <Typography variant="body2">{graduate.workplace}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <LocationOn sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                          <Typography variant="body2">{graduate.location}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Grade sx={{ mr: 1, color: 'primary.main', fontSize: 20 }} />
                          <Typography variant="body2">GPA: {graduate.gpa}</Typography>
                        </Box>
                      </Box>
                      <Box sx={{ mb: 2 }}>
                        {graduate.skills?.split(',').map((skill, i) => (
                          <Chip
                            key={i}
                            label={skill.trim()}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {graduate.experience}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recommendations; 