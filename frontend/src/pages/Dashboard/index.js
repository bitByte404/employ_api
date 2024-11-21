import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Avatar,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  School,
  Work,
  Psychology,
  Assessment,
  Person,
  EmojiObjects,
  TrendingUp,
  ShowChart,
  Timeline,
  PieChart as PieChartIcon
} from '@mui/icons-material';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { statisticsAPI } from '../../services/api';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// 模拟数据
const mockData = {
  careerPathDistribution: [
    { name: '就业', value: 45 },
    { name: '考研', value: 30 },
    { name: '出国', value: 15 },
    { name: '其他', value: 10 },
  ],
  majorDistribution: [
    { name: '信息管理', value: 40 },
    { name: '计算机', value: 35 },
    { name: '数据科学', value: 25 },
  ],
  employmentTrends: [
    { year: '2019', 就业率: 65, 考研率: 25, 出国率: 10 },
    { year: '2020', 就业率: 60, 考研率: 28, 出国率: 12 },
    { year: '2021', 就业率: 62, 考研率: 27, 出国率: 11 },
    { year: '2022', 就业率: 63, 考研率: 26, 出国率: 11 },
    { year: '2023', 就业率: 64, 考研率: 25, 出国率: 11 },
  ],
};

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [statistics, setStatistics] = useState(mockData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await statisticsAPI.getStatistics();
      if (response.data && response.data.careerPathDistribution) {
        setStatistics(response.data);
      }
    } catch (error) {
      console.error('获取统计数据失败:', error);
      // 保持使用模拟数据
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon, color, onClick }) => (
    <Card 
      sx={{ 
        height: '100%',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            {icon}
          </Avatar>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" color="primary" gutterBottom>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  // 渲染图表的安全检查函数
  const renderPieChart = () => {
    if (!statistics?.careerPathDistribution?.length) {
      return null;
    }

    return (
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={statistics.careerPathDistribution}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label
          >
            {statistics.careerPathDistribution.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderBarChart = () => {
    if (!statistics?.majorDistribution?.length) {
      return null;
    }

    return (
      <ResponsiveContainer>
        <BarChart data={statistics.majorDistribution}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderLineChart = () => {
    if (!statistics?.employmentTrends?.length) {
      return null;
    }

    return (
      <ResponsiveContainer>
        <LineChart data={statistics.employmentTrends}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="就业率" stroke="#8884d8" />
          <Line type="monotone" dataKey="考研率" stroke="#82ca9d" />
          <Line type="monotone" dataKey="出国率" stroke="#ffc658" />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* 欢迎卡片 */}
      <Card sx={{ mb: 3, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)', color: 'white' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h4" gutterBottom>
                欢迎回来！
              </Typography>
              <Typography variant="subtitle1">
                这里是你的个性化数据分析和推荐
              </Typography>
            </Box>
            <Person sx={{ fontSize: 60, opacity: 0.8 }} />
          </Box>
        </CardContent>
      </Card>

      {/* 快速操作卡片 */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <StatCard
            title="性格测试"
            value="开始测试"
            icon={<Psychology />}
            color="#1976d2"
            onClick={() => navigate('/personality-test')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="职业兴趣测试"
            value="开始测试"
            icon={<Assessment />}
            color="#2196f3"
            onClick={() => navigate('/career-test')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="查看推荐"
            value="查看详情"
            icon={<EmojiObjects />}
            color="#00acc1"
            onClick={() => navigate('/recommendations')}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="完善信息"
            value="更新资料"
            icon={<Person />}
            color="#00bcd4"
            onClick={() => navigate('/profile')}
          />
        </Grid>
      </Grid>

      {/* 统计图表 */}
      <Grid container spacing={3}>
        {/* 就业去向分布 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <PieChartIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="h6">就业去向分布</Typography>
              </Box>
              <Box sx={{ height: 300 }}>
                {renderPieChart()}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 专业分布 */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <ShowChart sx={{ color: theme.palette.secondary.main, mr: 1 }} />
                <Typography variant="h6">专业分布</Typography>
              </Box>
              <Box sx={{ height: 300 }}>
                {renderBarChart()}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* 趋势分析 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Timeline sx={{ color: theme.palette.success.main, mr: 1 }} />
                <Typography variant="h6">就业趋势分析</Typography>
              </Box>
              <Box sx={{ height: 400 }}>
                {renderLineChart()}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 