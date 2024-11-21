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
  CircularProgress,
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { userAPI } from '../../services/api';

const validationSchema = Yup.object({
  realName: Yup.string().required('真实姓名是必填项'),
  studentId: Yup.string().required('学号是必填项'),
  major: Yup.string().required('专业是必填项'),
  politicalStatus: Yup.string().required('政治面貌是必填项'),
  hometown: Yup.string().required('生源地是必填项'),
  gpa: Yup.number()
    .min(0, 'GPA不能小于0')
    .max(5, 'GPA不能大于5')
    .required('GPA是必填项'),
  phone: Yup.string().required('联系电话是必填项'),
  email: Yup.string().email('请输入有效的邮箱').required('邮箱是必填项'),
});

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
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

    fetchProfile();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      await userAPI.updateProfile(values);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error('更新个人信息失败:', error);
    } finally {
      setSubmitting(false);
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
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            个人信息
          </Typography>
          {saveSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              个人信息更新成功！
            </Alert>
          )}
          <Formik
            initialValues={profile || {}}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
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
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                      sx={{ mt: 2 }}
                    >
                      {isSubmitting ? '保存中...' : '保存'}
                    </Button>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile; 