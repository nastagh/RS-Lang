import React, { useState } from 'react';
import {
  Box, Grid, Button, CircularProgress, Avatar, IconButton,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import scoreResult from '../constants/scoreResult';
import { getCorrectWord } from '../utils/getCorrectWord';
import { baseUrl } from '../utils/axios';

export default function AudioScore({ gameScore, onPlayAgain }) {
  const [showWords, setShowWords] = useState(false);
  const navigate = useNavigate();
  const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 2,
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const amountRightResult = gameScore.filter((el) => el.right).length;
  const progressPercent = (amountRightResult / gameScore.length) * 100;
  const amountIncorrectResult = gameScore.length - amountRightResult;

  const resultPhrase = () => (
    (amountRightResult === gameScore.length) ? scoreResult.GOOD_RESULT : scoreResult.BAD_RESULT
  );

  return (
    <Box sx={style}>
      <Grid container justifyContent="space-around">
        <Button color={!showWords ? 'secondary' : 'third'} onClick={() => setShowWords(false)}>
          <Typography variant="h5">
            Результат
          </Typography>
        </Button>
        <Button color={showWords ? 'secondary' : 'third'} onClick={() => setShowWords(true)}>
          <Typography variant="h5">
            Просмотреть мои слова
          </Typography>
        </Button>
      </Grid>
      {!showWords ? (
        <>
          <Typography variant="h5" mt={6}>{resultPhrase()}</Typography>
          <Typography mt={4}>
            {amountRightResult}
            {' '}
            {getCorrectWord(amountRightResult) }
            {' '}
            изучено,
            {' '}
            {gameScore.length - amountRightResult}
            {' '}
            {getCorrectWord(gameScore.length - amountRightResult) }
            {' '}
            на изучении
          </Typography>
          <Box sx={{ position: 'relative', display: 'inline-flex' }} mt={6}>
            <CircularProgress variant="determinate" value={progressPercent} size={200} />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
              >
                {`${Math.round(progressPercent)}%`}
                {' '}
                изученных слов
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Grid container direction="column" mt={6} alignItems="center">
          <Typography variant="textError">
            Ошибок
            {' '}
            {amountIncorrectResult}
          </Typography>
          {gameScore.filter((el) => !el.right).map((el) => {
            const audio = new Audio(`${baseUrl}/${el.audio}`);
            return (
              <Grid container alignItems="center" justifyContent="flex-start" spacing={3} key={el.word}>
                <Grid item>
                  <IconButton onClick={() => audio.play()}>
                    <Avatar src="./assets/images/icon-sound.png" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {el.word}
                    {' '}
                    -
                    {' '}
                    {el.translate}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}
          <Typography variant="textError">
            Правильно
            {' '}
            {amountRightResult}
          </Typography>
          {gameScore.filter((el) => el.right).map((el) => {
            const audio = new Audio(`${baseUrl}/${el.audio}`);
            return (
              <Grid container alignItems="center" justifyContent="flex-start" spacing={3} key={el.word}>
                <Grid item>
                  <IconButton onClick={() => audio.play()}>
                    <Avatar src="./assets/images/icon-sound.png" />
                  </IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6">
                    {el.word}
                    {' '}
                    -
                    {' '}
                    {el.translate}
                  </Typography>
                </Grid>
              </Grid>
            );
          })}

        </Grid>

      )}
      <Grid container justifyContent="space-around" mt={6}>
        <Button onClick={onPlayAgain}>
          Сыграть ещё раз
        </Button>
        <Button onClick={() => navigate('/book')}>
          Перейти в учебник
        </Button>
      </Grid>
    </Box>
  );
}
