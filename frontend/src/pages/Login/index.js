import React from 'react';
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
} from '@mui/material';
import { authAPI } from '../../services/api';
import { setCredentials } from '../../store/authSlice';

const validationSchema = Yup.object({
  username: Yup.string().required('用户名是必填项'),
  password: Yup.string().required('密码是必填项'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const response = await authAPI.login(values);
      dispatch(setCredentials(response.data));
      navigate('/');
    } catch (error) {
      setErrors({ submit: error.response?.data?.message || '登录失败' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Card sx={{ width: '100%', borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              智绘未来
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
              高校学生发展智导站
            </Typography>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
                <Form>
                  <TextField
                    fullWidth
                    margin="normal"
                    name="username"
                    label="用户名"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.username && Boolean(errors.username)}
                    helperText={touched.username && errors.username}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    name="password"
                    label="密码"
                    type="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                  {errors.submit && (
                    <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                      {errors.submit}
                    </Typography>
                  )}
                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    登录
                  </Button>
                  <Typography variant="body2" align="center">
                    还没有账号？{' '}
                    <Link to="/register" style={{ textDecoration: 'none', color: 'primary.main' }}>
                      立即注册
                    </Link>
                  </Typography>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login; 