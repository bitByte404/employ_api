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
} from '@mui/material';
import { recommendationAPI } from '../../services/api';

const Recommendations = () => {
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      setError(null);
      console.log('开始获取推荐信息');
      
      const response = await recommendationAPI.getSimilar();
      console.log('获取到推荐信息响应:', response);
      
      if (!response.data) {
        throw new Error('返回数据为空');
      }
      
      setRecommendations(response.data);
      
    } catch (err) {
      console.error('获取推荐信息失败:', err);
      const errorMessage = err.response?.data?.message 
        || err.response?.data?.error 
        || err.message 
        || '获取推荐信息失败';
      setError(errorMessage);
      
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

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        个性化推荐
      </Typography>
      <Typography color="textSecondary" paragraph>
        基于你的专业、兴趣和测试结果，为你推荐以下发展方向和参考案例
      </Typography>

      <Grid container spacing={3}>
        {/* 就业方向 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                就业方向
              </Typography>
              {recommendations?.employment?.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    {item.position} @ {item.company}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* 考研方向 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                考研方向
              </Typography>
              {recommendations?.graduateSchool?.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    {item.school} - {item.major}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* 出国方向 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                出国方向
              </Typography>
              {recommendations?.overseas?.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Typography variant="subtitle1" color="primary">
                    {item.school} - {item.major}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.description}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* 相似案例 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                相似案例推荐
              </Typography>
              {recommendations?.similarCases?.map((graduate, index) => (
                <Box key={index} sx={{ mb: 3, p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                  <Typography variant="subtitle1">
                    {graduate.name} - {graduate.major}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {graduate.graduationYear} | {graduate.careerPath} | {graduate.workplace}
                  </Typography>
                  <Box sx={{ mb: 1 }}>
                    {graduate.skills?.split(',').map((skill, i) => (
                      <Chip key={i} label={skill.trim()} size="small" sx={{ mr: 0.5, mb: 0.5 }} />
                    ))}
                  </Box>
                  <Typography variant="body2">
                    经验：{graduate.experience}
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Recommendations; 