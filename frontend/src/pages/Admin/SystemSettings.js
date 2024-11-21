import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { systemAPI } from '../../services/api';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    systemName: '智绘未来：高校学生发展智导站',
    passwordMinLength: 6,
    passwordRequireSpecial: true,
    loginAttempts: 5,
    lockDuration: 30,
    autoBackup: true,
    backupInterval: 24,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await systemAPI.getSettings();
      setSettings(response.data);
    } catch (error) {
      setError('获取系统设置失败');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field) => (event) => {
    setSettings({
      ...settings,
      [field]: event.target.type === 'checkbox' ? event.target.checked : event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      await systemAPI.updateSettings(settings);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      setError('保存设置失败');
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          设置保存成功！
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* 基本设置 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                基本设置
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="系统名称"
                    value={settings.systemName}
                    onChange={handleChange('systemName')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 安全设置 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                安全设置
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="密码最小长度"
                    value={settings.passwordMinLength}
                    onChange={handleChange('passwordMinLength')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.passwordRequireSpecial}
                        onChange={handleChange('passwordRequireSpecial')}
                      />
                    }
                    label="要求特殊字符"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="最大登录尝试次数"
                    value={settings.loginAttempts}
                    onChange={handleChange('loginAttempts')}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="锁定时长（分钟）"
                    value={settings.lockDuration}
                    onChange={handleChange('lockDuration')}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* 备份设置 */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                备份设置
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoBackup}
                        onChange={handleChange('autoBackup')}
                      />
                    }
                    label="自动备份"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="备份间隔（小时）"
                    value={settings.backupInterval}
                    onChange={handleChange('backupInterval')}
                    disabled={!settings.autoBackup}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
            >
              保存设置
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SystemSettings; 