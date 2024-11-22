import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Typography,
  Alert,
  Avatar,
  Paper,
  Divider,
  CircularProgress,
  Chip,
} from '@mui/material';
import {
  Person,
  School,
  Email,
  Phone,
  LocationOn,
  Grade,
  EmojiEvents,
} from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userAPI } from '../../services/api';

const validationSchema = Yup.object({
  realName: Yup.string().required('真实姓名是必填项'),
  studentId: Yup.string().required('学号是必填项'),
  major: Yup.string().required('专业是必填项'),
  politicalStatus: Yup.string().required('政治面貌是必填项'),
  hometown: Yup.string().required('生源地是必填项'),
  gpa: Yup.number().min(0).max(5).required('GPA是必填项'),
  phone: Yup.string().required('联系电话是必填项'),
  email: Yup.string().email('请输入有效的邮箱').required('邮箱是必填项'),
});

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await userAPI.getProfile();
      setProfile(response.data);
    } catch (error) {
      console.error('获取个人信息失败:', error);
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

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      <Grid container spacing={3}>
        {/* 个人信息卡片 */}
        <Grid item xs={12}>
          <Paper 
            elevation={3}
            sx={{ 
              p: 3, 
              borderRadius: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{ 
                  width: 100, 
                  height: 100,
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                }}
              >
                {profile?.realName?.[0] || 'U'}
              </Avatar>
              <Box sx={{ ml: 3 }}>
                <Typography variant="h4" gutterBottom>
                  {profile?.realName || '未设置姓名'}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {profile?.major || '未设置专业'} | {profile?.studentId || '未设置学号'}
                </Typography>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <School sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>专业: {profile?.major}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Grade sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>GPA: {profile?.gpa}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Email sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>邮箱: {profile?.email}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Phone sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography>电话: {profile?.phone}</Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* 编辑表单 */}
        <Grid item xs={12}>
          <Card 
            elevation={3}
            sx={{ 
              borderRadius: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f5f5f5 100%)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom color="primary">
                编辑个人信息
              </Typography>
              {saveSuccess && (
                <Alert severity="success" sx={{ mb: 3 }}>
                  个人信息更新成功！
                </Alert>
              )}
              <Formik
                initialValues={profile || {}}
                validationSchema={validationSchema}
                onSubmit={async (values, { setSubmitting }) => {
                  try {
                    await userAPI.updateProfile(values);
                    setSaveSuccess(true);
                    setTimeout(() => setSaveSuccess(false), 3000);
                  } catch (error) {
                    console.error('更新个人信息失败:', error);
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                  <Form>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="realName"
                          label="真实姓名"
                          value={values.realName || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.realName && Boolean(errors.realName)}
                          helperText={touched.realName && errors.realName}
                          sx={{ 
                            '& .MuiOutlinedInput-root': {
                              borderRadius: 2
                            }
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="studentId"
                          label="学号"
                          value={values.studentId || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.studentId && Boolean(errors.studentId)}
                          helperText={touched.studentId && errors.studentId}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="major"
                          label="专业"
                          value={values.major || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.major && Boolean(errors.major)}
                          helperText={touched.major && errors.major}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="politicalStatus"
                          label="政治面貌"
                          value={values.politicalStatus || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.politicalStatus && Boolean(errors.politicalStatus)}
                          helperText={touched.politicalStatus && errors.politicalStatus}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="hometown"
                          label="生源地"
                          value={values.hometown || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.hometown && Boolean(errors.hometown)}
                          helperText={touched.hometown && errors.hometown}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="gpa"
                          label="GPA"
                          type="number"
                          value={values.gpa || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.gpa && Boolean(errors.gpa)}
                          helperText={touched.gpa && errors.gpa}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="phone"
                          label="联系电话"
                          value={values.phone || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.phone && Boolean(errors.phone)}
                          helperText={touched.phone && errors.phone}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          name="email"
                          label="邮箱"
                          value={values.email || ''}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, textAlign: 'right' }}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: 2,
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1976d2 30%, #2196F3 90%)',
                          }
                        }}
                      >
                        {isSubmitting ? '保存中...' : '保存更改'}
                      </Button>
                    </Box>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile; 