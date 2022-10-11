/*
 *
 * Interview
 *
 */
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';

import { Divider, TextField, Autocomplete, Grid, Paper, Typography } from '@mui/material';

import UserDetail from 'app/components/UserDetail';
import PaperList from 'app/components/PaperList';
import Loading from 'app/components/Loading';
import { selectInterview } from './slice/selectors';
import classes from './styles.module.css';
import { actions } from './slice';

interface Props { }

export default function Interview(props: Props) {
  //====================================== Hook ======================================
  const { users, loading } = useSelector(selectInterview);
  const dispatch = useDispatch();
  const history = useHistory();
  //====================================== State ======================================
  const [usersDetail, setUserDetail] = useState<Play | undefined>(undefined);
  //====================================== Effect ======================================
  useEffect(() => {
    dispatch(actions.get());
  }, [dispatch]);

  useEffect(() => {
    if (!localStorage.getItem('interviewer')) {
      const name = prompt('Nhập tên người phỏng vấn');
      if (name != null) {
        localStorage.setItem('interviewer', name);
      } else {
        history.push('/leaderboard');
      }
    }
  }, [history]);
  //====================================== Callback ======================================
  const handleChangeSearch = (event: React.SyntheticEvent, value: Play | null) => {
    if (value) {
      setUserDetail(value);
    } else {
      setUserDetail(undefined);
    }
  };

  const handleSubmit = (attitudeScore: number, knowledgeScore: number, comment: string) => {
    if (usersDetail) {
      if (localStorage.getItem('interviewer')) {
        dispatch(
          actions.interview({
            ...usersDetail,
            attitudeScore,
            knowledgeScore,
            comment,
            interviewer: localStorage.getItem('interviewer'),
          }),
        );
      }
      setUserDetail(undefined);
    } else {
      alert('Chọn một sinh viên !');
    }
  };
  //====================================== Render ======================================
  return !loading ? (
    <Grid container>
      <Grid item xs={4} className={classes.paper}>
        <Paper>
          <Typography variant="h5" gutterBottom className={classes.header}>
            THÔNG TIN SINH VIÊN
          </Typography>
          <Divider variant="middle" />
          {users && users.length > 0 && (
            <div className={classes.searchBox}>
              <Autocomplete
                className={classes.autocomplete}
                options={users.filter(item => item.userID)}
                getOptionLabel={(option: Play) => (option.userID ? option.userID.studentCode : '')}
                getOptionDisabled={(option: Play) => option.isInterviewed === true}
                onChange={handleChangeSearch}
                renderInput={params => <TextField {...params} label="Mã Sinh Viên" variant="outlined" fullWidth />}
              />
            </div>
          )}

          {usersDetail && (
            <>
              <Divider variant="middle" />
              <UserDetail usersDetail={usersDetail} handleSubmit={handleSubmit} />
            </>
          )}
        </Paper>
      </Grid>
      <Grid item xs={8} className={classes.paper}>
        <PaperList />
      </Grid>
    </Grid>
  ) : (
    <Loading />
  );
}
