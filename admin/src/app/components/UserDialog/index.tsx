/*
 *
 * UserDialog
 *
 */
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

import { Modal, Card, CardContent, CardActions, Grid, Typography, Button, TextField } from '@mui/material';

import classes from './styles.module.css';
import { request } from 'utils/request';
import stringNormalize from 'utils/stringNormalize';
import { USER } from 'constants/config';

interface Props {
  data?: User;
  open: boolean;
  setOpen: Function;
  handleSubmit: Function;
}

const validationSchema = Yup.object().shape({
  studentCode: Yup.number()
    .min(2017000000, 'Mã sinh viên không hợp lệ !')
    .max(2022999999, 'Mã sinh viên không hợp lệ !')
    .required('Trường này không được để trống !'),
  studentName: Yup.string().required('Trường này không được để trống !'),
  studentClass: Yup.string()
    .required('Trường này không được để trống !')
    .matches(/[A-Z]{4}[0-9]-[K][1][0-9]/, 'Lớp-Khoá không hợp lệ, ví dụ: HTTT1-K12'),
  studentPhone: Yup.string()
    .required('Trường này không được để trống !')
    .matches(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/, 'Số điện thoại không hợp lệ !'),
  password: Yup.string().required('Trường này không được để trống !'),
});

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export default function UserDialog({ open, setOpen, data, handleSubmit }: Props) {
  //====================================== Callback ======================================
  const onSubmit = async (values, actions) => {
    values.studentName = stringNormalize(values.studentName);
    const { response } = await request({
      url: `${USER}?limit=5&skip=0&filter%5BstudentCode%5D%5B%24regex%5D=${values.studentCode}&filter%5BstudentCode%5D%5B%24options%5D=i`,
      method: 'GET',
    });
    if (response && response.count > 0 && !data) {
      actions.setSubmitting(false);
      actions.setFieldError('studentCode', 'Mã sinh viên đã được sử dụng');
    } else {
      if (data) {
        handleSubmit({
          ...data,
          ...values,
        });
      } else {
        handleSubmit(values);
      }
      setOpen(false);
    }
  };
  //====================================== Render ======================================
  return (
    <Modal onClose={() => setOpen(false)} open={open}>
      <Formik
        initialValues={{
          studentCode: data ? data.studentCode : '',
          studentName: data ? data.studentName : '',
          studentClass: data ? data.studentClass : '',
          studentPhone: data ? data.studentPhone : '',
          password: data ? data.password : `${getRndInteger(100000, 999999)}`,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form autoComplete="off">
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                <Typography align="center" gutterBottom variant="h4">
                  {data ? 'Chỉnh sửa người dùng' : 'Thêm người dùng'}
                </Typography>
                <Grid className={classes.container} container spacing={3}>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      error={!!errors.studentCode && !!touched.studentCode}
                      helperText={errors.studentCode}
                      name="studentCode"
                      label="Mã sinh viên"
                      variant="outlined"
                      type="number"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      error={!!errors.studentName && !!touched.studentName}
                      helperText={errors.studentName}
                      name="studentName"
                      label="Tên sinh viên"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      error={!!errors.studentClass && !!touched.studentClass}
                      helperText={errors.studentClass}
                      name="studentClass"
                      label="Lớp-Khoá"
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <Field
                      as={TextField}
                      error={!!errors.studentPhone && !!touched.studentPhone}
                      helperText={errors.studentPhone}
                      name="studentPhone"
                      label="Số điện thoại"
                      variant="outlined"
                      style={{ color: '#FFFFFF !important' }}
                      fullWidth
                    />
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <Field as={TextField} name="password" label="Mật khẩu" variant="outlined" fullWidth disabled />
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions className={classes.actions}>
                <Button
                  onClick={() => setOpen(false)}
                  variant="contained"
                  color="primary"
                  className={classes.closeButton}
                >
                  Đóng
                </Button>
                <Button className={classes.saveButton} variant="contained" type="submit" color="primary">
                  Lưu
                </Button>
              </CardActions>
            </Card>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
