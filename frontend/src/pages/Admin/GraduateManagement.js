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
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Typography,
  Alert,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { graduateAPI } from '../../services/api';

const validationSchema = Yup.object({
  name: Yup.string().required('姓名是必填项'),
  major: Yup.string().required('专业是必填项'),
  graduationYear: Yup.string().required('毕业年份是必填项'),
  careerPath: Yup.string().required('就业去向是必填项'),
  workplace: Yup.string().required('工作单位/学校是必填项'),
  position: Yup.string().required('职位/专业是必填项'),
  gpa: Yup.number().min(0).max(5).required('GPA是必填项'),
});

const GraduateManagement = () => {
  const [graduates, setGraduates] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedGraduate, setSelectedGraduate] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGraduates();
  }, [page, rowsPerPage, searchTerm]);

  const fetchGraduates = async () => {
    try {
      const response = await graduateAPI.searchGraduates(searchTerm, page, rowsPerPage);
      setGraduates(response.data.content);
    } catch (error) {
      setError('获取毕业生信息失败');
    }
  };

  const handleAdd = () => {
    setSelectedGraduate(null);
    setDialogOpen(true);
  };

  const handleEdit = (graduate) => {
    setSelectedGraduate(graduate);
    setDialogOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('确定要删除此条记录吗？')) {
      try {
        await graduateAPI.deleteGraduate(id);
        fetchGraduates();
      } catch (error) {
        setError('删除失败');
      }
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (selectedGraduate) {
        await graduateAPI.updateGraduate(selectedGraduate.id, values);
      } else {
        await graduateAPI.createGraduate(values);
      }
      setDialogOpen(false);
      fetchGraduates();
    } catch (error) {
      setError(selectedGraduate ? '更新失败' : '添加失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h5">毕业生信息管理</Typography>
            <Box>
              <TextField
                size="small"
                placeholder="搜索..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ mr: 2 }}
                InputProps={{
                  endAdornment: <SearchIcon />
                }}
              />
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                添加
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>姓名</TableCell>
                  <TableCell>专业</TableCell>
                  <TableCell>毕业年份</TableCell>
                  <TableCell>就业去向</TableCell>
                  <TableCell>工作单位/学校</TableCell>
                  <TableCell>GPA</TableCell>
                  <TableCell>操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {graduates.map((graduate) => (
                  <TableRow key={graduate.id}>
                    <TableCell>{graduate.name}</TableCell>
                    <TableCell>{graduate.major}</TableCell>
                    <TableCell>{graduate.graduationYear}</TableCell>
                    <TableCell>{graduate.careerPath}</TableCell>
                    <TableCell>{graduate.workplace}</TableCell>
                    <TableCell>{graduate.gpa}</TableCell>
                    <TableCell>
                      <IconButton
                        size="small"
                        onClick={() => handleEdit(graduate)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(graduate.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
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
            rowsPerPageOptions={[5, 10, 25]}
          />
        </CardContent>
      </Card>

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {selectedGraduate ? '编辑毕业生信息' : '添加毕业生信息'}
        </DialogTitle>
        <Formik
          initialValues={selectedGraduate || {
            name: '',
            major: '',
            graduationYear: '',
            careerPath: '',
            workplace: '',
            position: '',
            gpa: '',
            experience: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  {/* 表单字段... */}
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDialogOpen(false)}>取消</Button>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  保存
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default GraduateManagement; 