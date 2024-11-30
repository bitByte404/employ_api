import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
  Grid,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Email,
  Phone,
  Badge,
  School,
} from '@mui/icons-material';
import { authAPI } from '../../services/api';
import { setCredentials } from '../../store/authSlice';
import { useDispatch } from 'react-redux';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('用户名是必填项')
    .min(4, '用户名至少4个字符'),
  password: Yup.string()
    .required('密码是必填项')
    .min(6, '密码至少6个字符')
    .max(20, '密码最多20个字符')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
      '密码必须包含字母和数字'
    ),
  confirmPassword: Yup.string()
    .required('请确认密码')
    .oneOf([Yup.ref('password'), null], '两次输入的密码不一致'),
  realName: Yup.string()
    .required('真实姓名是必填项'),
  studentId: Yup.string()
    .required('学号是必填项'),
  phone: Yup.string()
    .required('手机号是必填项')
    .matches(/^1[3-9]\d{9}$/, '请输入有效的手机号'),
  email: Yup.string()
    .required('邮箱是必填项')
    .email('请输入有效的邮箱地址'),
});

const steps = ['账号信息', '个人信息', '联系方式'];

const Register = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      const response = await authAPI.register(values);
      
      if (response.data.token) {
        // 如果注册成功并返回了token，直接登录
        dispatch(setCredentials(response.data));
        navigate('/');
      } else {
        // 否则跳转到登录页面
        navigate('/login', { 
          state: { message: '注册成功，请登录' }
        });
      }
    } catch (err) {
      console.error('注册失败:', err);
      setError(err.response?.data?.message || '注册失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      }}
    >
      <Container component="main" maxWidth="md" sx={{ my: 'auto' }}>
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            py: 4,
            px: { xs: 3, md: 6 },
            background: 'rgba(255, 255, 255, 0.95)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              注册账号
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: 'text.secondary', mb: 4 }}
            >
              加入智绘未来，开启你的职业规划之旅
            </Typography>

            <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={{
                username: '',
                password: '',
                confirmPassword: '',
                realName: '',
                studentId: '',
                phone: '',
                email: '',
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                  <Grid container spacing={3}>
                    {activeStep === 0 && (
                      <>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="username"
                            label="用户名"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.username && Boolean(errors.username)}
                            helperText={touched.username && errors.username}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Person color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="password"
                            label="密码"
                            type={showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.password && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock color="primary" />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                  >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            name="confirmPassword"
                            label="确认密码"
                            type={showPassword ? 'text' : 'password'}
                            value={values.confirmPassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                            helperText={touched.confirmPassword && errors.confirmPassword}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Lock color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </>
                    )}

                    {activeStep === 1 && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="realName"
                            label="真实姓名"
                            value={values.realName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.realName && Boolean(errors.realName)}
                            helperText={touched.realName && errors.realName}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Badge color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="studentId"
                            label="学号"
                            value={values.studentId}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.studentId && Boolean(errors.studentId)}
                            helperText={touched.studentId && errors.studentId}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <School color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </>
                    )}

                    {activeStep === 2 && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="phone"
                            label="手机号"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Phone color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            name="email"
                            label="邮箱"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <Email color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </Grid>
                      </>
                    )}
                  </Grid>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                      variant="outlined"
                      onClick={() => setActiveStep((prev) => prev - 1)}
                      disabled={activeStep === 0}
                    >
                      上一步
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={isSubmitting}
                        sx={{
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)',
                          },
                        }}
                      >
                        {isSubmitting ? '注册中...' : '完成注册'}
                      </Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => setActiveStep((prev) => prev + 1)}
                        sx={{
                          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                          color: 'white',
                          '&:hover': {
                            background: 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)',
                          },
                        }}
                      >
                        下一步
                      </Button>
                    )}
                  </Box>

                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      已有账号？{' '}
                      <Link
                        to="/login"
                        style={{
                          textDecoration: 'none',
                          color: '#2196F3',
                          fontWeight: 500,
                        }}
                      >
                        立即登录
                      </Link>
                    </Typography>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Register; 