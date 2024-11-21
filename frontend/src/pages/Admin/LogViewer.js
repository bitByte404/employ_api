import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Grid,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { systemAPI } from '../../services/api';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [logLevel, setLogLevel] = useState('ALL');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    fetchLogs();
  }, [page, rowsPerPage, logLevel, startDate, endDate, keyword]);

  const fetchLogs = async () => {
    try {
      const response = await systemAPI.getLogs({
        page,
        size: rowsPerPage,
        level: logLevel,
        startDate: startDate?.toISOString(),
        endDate: endDate?.toISOString(),
        keyword,
      });
      setLogs(response.data);
    } catch (error) {
      console.error('获取日志失败:', error);
    }
  };

  const getLogLevelColor = (level) => {
    const colors = {
      ERROR: 'error.main',
      WARN: 'warning.main',
      INFO: 'info.main',
      DEBUG: 'success.main',
    };
    return colors[level] || 'text.primary';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            系统日志
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>日志级别</InputLabel>
                <Select
                  value={logLevel}
                  label="日志级别"
                  onChange={(e) => setLogLevel(e.target.value)}
                >
                  <MenuItem value="ALL">全部</MenuItem>
                  <MenuItem value="ERROR">错误</MenuItem>
                  <MenuItem value="WARN">警告</MenuItem>
                  <MenuItem value="INFO">信息</MenuItem>
                  <MenuItem value="DEBUG">调试</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="开始日期"
                value={startDate}
                onChange={setStartDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <DatePicker
                label="结束日期"
                value={endDate}
                onChange={setEndDate}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="搜索关键词"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
              />
            </Grid>
          </Grid>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>时间</TableCell>
                  <TableCell>级别</TableCell>
                  <TableCell>类别</TableCell>
                  <TableCell>消息</TableCell>
                  <TableCell>用户</TableCell>
                  <TableCell>IP地址</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                    <TableCell>
                      <Typography color={getLogLevelColor(log.level)}>
                        {log.level}
                      </Typography>
                    </TableCell>
                    <TableCell>{log.category}</TableCell>
                    <TableCell>{log.message}</TableCell>
                    <TableCell>{log.username}</TableCell>
                    <TableCell>{log.ipAddress}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={-1}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(event) => {
              setRowsPerPage(parseInt(event.target.value, 10));
              setPage(0);
            }}
            rowsPerPageOptions={[10, 25, 50, 100]}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default LogViewer; 