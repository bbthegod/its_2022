/*
 *
 * UserDetail
 *
 */
import { useState } from 'react';

import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  Divider,
  TextareaAutosize,
  Button,
  TextField,
  Slider,
  Typography,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ClassIcon from '@mui/icons-material/Class';
import PhoneIcon from '@mui/icons-material/Phone';
import CodeIcon from '@mui/icons-material/Code';
import ScoreboardIcon from '@mui/icons-material/Score';

import classes from './styles.module.css';

interface Props {
  usersDetail: Play;
  handleSubmit: Function;
}

export default function UserDetail({ usersDetail, handleSubmit }: Props) {
  //====================================== State ======================================
  const [attitudeScore, setAttitudeScore] = useState(0);
  const [knowledgeScore, setKnowledgeScore] = useState(0);
  const [comment, setComment] = useState('');
  //====================================== Callback ======================================
  const onSubmit = () => {
    handleSubmit(attitudeScore, knowledgeScore, comment);
    setAttitudeScore(0);
    setKnowledgeScore(0);
    setComment('');
  };
  //====================================== Render ======================================
  return (
    <List className={classes.content}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <CodeIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={usersDetail?.userID?.studentCode} secondary="Mã Sinh Viên" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={usersDetail?.userID?.studentName} secondary="Họ Tên" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ClassIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={usersDetail?.userID?.studentClass} secondary="Lớp" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PhoneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={usersDetail?.userID?.studentPhone} secondary="Số Điện Thoại" />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ScoreboardIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={usersDetail?.totalScore} secondary="Điểm Bài Thi" />
      </ListItem>
      <div className={classes.scoreBox}>
        <Grid container md={12}>
          <Grid item md={12} style={{ marginTop: '20px' }}>
            <Typography id="input-slider" gutterBottom>
              Thái Độ
            </Typography>
            <Slider
              aria-label="Small steps"
              defaultValue={0}
              getAriaValueText={v => `${v} Điểm`}
              step={10}
              marks
              value={attitudeScore}
              onChange={(e: any) => setAttitudeScore(e.target?.value)}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item md={12} style={{ marginTop: '20px' }}>
            <Typography id="input-slider" gutterBottom>
              Kiến Thức
            </Typography>
            <Slider
              aria-label="Small steps"
              defaultValue={0}
              getAriaValueText={v => `${v} Điểm`}
              step={10}
              marks
              value={knowledgeScore}
              onChange={(e: any) => setKnowledgeScore(e.target?.value)}
              min={0}
              max={100}
              valueLabelDisplay="auto"
            />
          </Grid>

          <Grid item md={12} className={classes.textarea}>
            <TextareaAutosize value={comment} onChange={e => setComment(e.target.value)} />
          </Grid>
          <Grid item md={12}>
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Gửi đi
            </Button>
          </Grid>
        </Grid>
      </div>
    </List>
  );
}
