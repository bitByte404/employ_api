import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
  Grid,
  Alert,
} from '@mui/material';
import { authAPI } from '../../services/api';

const validationSchema = Yup.object({
  username: Yup.string()
    .required('用户名是必填项')
    .min(4, '用户名至少4个字符'),
  password: Yup.string()
    .required('密码是必填项')
    .min(6, '密码至少6个字符'),
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

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = React.useState(null);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await authAPI.register(values);
      navigate('/login', { 
        state: { message: '注册成功，请登录' }
      });
    } catch (err) {
      setError(err.response?.data?.message || '注册失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card sx={{ width: '100%', borderRadius: 2 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" align="center" gutterBottom>
              注册账号
            </Typography>
            <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
              加入智绘未来，开启你的职业规划之旅
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
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
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="username"
                        label="用户名"
                        value={values.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.username && Boolean(errors.username)}
                        helperText={touched.username && errors.username}
                      />
                    </Grid>
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
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="password"
                        label="密码"
                        type="password"
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.password && Boolean(errors.password)}
                        helperText={touched.password && errors.password}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        name="confirmPassword"
                        label="确认密码"
                        type="password"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                        helperText={touched.confirmPassword && errors.confirmPassword}
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
                      />
                    </Grid>
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
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        name="email"
                        label="邮箱"
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                  </Grid>

                  <Button
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {isSubmitting ? '注册中...' : '注册'}
                  </Button>

                  <Typography variant="body2" align="center">
                    已有账号？{' '}
                    <Link to="/login" style={{ textDecoration: 'none', color: 'primary.main' }}>
                      立即登录
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

export default Register; 