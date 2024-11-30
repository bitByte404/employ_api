import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  Container,
  Alert,
  IconButton,
  InputAdornment,
  Paper,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
} from '@mui/icons-material';
import { authAPI } from '../../services/api';
import { setCredentials } from '../../store/authSlice';

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
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      const response = await authAPI.login(values);
      dispatch(setCredentials(response.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || '登录失败，请检查用户名和密码');
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
      <Container component="main" maxWidth="sm" sx={{ my: 'auto' }}>
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
              智绘未来
            </Typography>
            <Typography
              variant="subtitle1"
              gutterBottom
              sx={{ color: 'text.secondary', mb: 4 }}
            >
              高校学生发展智导站
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
                {error}
              </Alert>
            )}

            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form style={{ width: '100%' }}>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="username"
                    label="用户名"
                    variant="outlined"
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
                    sx={{ mb: 3 }}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    name="password"
                    label="密码"
                    type={showPassword ? 'text' : 'password'}
                    variant="outlined"
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
                    sx={{ mb: 4 }}
                  />
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      py: 1.5,
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #1976d2 30%, #1e88e5 90%)',
                      },
                    }}
                  >
                    {isSubmitting ? '登录中...' : '登录'}
                  </Button>

                  <Box sx={{ mt: 3, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      还没有账号？{' '}
                      <Link
                        to="/register"
                        style={{
                          textDecoration: 'none',
                          color: '#2196F3',
                          fontWeight: 500,
                        }}
                      >
                        立即注册
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

export default Login; 